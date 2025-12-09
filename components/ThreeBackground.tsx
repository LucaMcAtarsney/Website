// components/ThreeBackground.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x000000, 0.18);

    // Camera
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lighting: only affects outer slabs & particles
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(4, 6, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.25);
    fill.position.set(-3, -4, -2);
    scene.add(fill);

    const ambient = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambient);

    // --- Monolith bars with neon cores ---

    const outerSlabGeometry = new THREE.BoxGeometry(1.4, 6.5, 0.32);
    const innerSlabGeometry = new THREE.BoxGeometry(0.16, 5.4, 0.06);

    const outerSlabMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0.25,
      roughness: 0.95,
    });

    const slabGroups: THREE.Group[] = [];
    const innerSlabMaterials: THREE.MeshBasicMaterial[] = [];
    const slabPositions = [-5.5, -2.5, 0, 2.5, 5.5];

    slabPositions.forEach((x, i) => {
      const group = new THREE.Group();

      // Outer dark slab
      const outer = new THREE.Mesh(outerSlabGeometry, outerSlabMaterial);
      outer.position.set(0, 0, 0);

      // Inner neon core (unlit, additive glow)
      const hue = 0.60 + i * 0.04;
      const baseColor = new THREE.Color().setHSL(hue, 0.9, 0.6);

      const innerMaterial = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const inner = new THREE.Mesh(innerSlabGeometry, innerMaterial);
      inner.position.set(0, 0, 0.19);

      group.add(outer);
      group.add(inner);

      group.position.set(x, -0.3, -6 - i * 0.4);
      group.rotation.y = (i % 2 === 0 ? 1 : -1) * 0.2;

      scene.add(group);
      slabGroups.push(group);
      innerSlabMaterials.push(innerMaterial);
    });

    // --- Particles: void dust ---

    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 18;
      positions[ix + 1] = (Math.random() - 0.5) * 8;
      positions[ix + 2] = -4 - Math.random() * 14;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xf5f5f5,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse parallax (subtle & eased)
    const mouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Camera: small controlled sway
      const targetX = mouse.x * 0.9;
      const targetY = 0.4 - mouse.y * 0.5;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -4);

      // Slabs: pulse + hue shift + tiny tilt
      slabGroups.forEach((group, i) => {
        const phase = t * 1.1 + i * 0.7;

        group.position.y = -0.3 + Math.sin(phase * 0.35) * 0.05;
        group.rotation.z = Math.sin(phase * 0.2) * 0.035;

        const mat = innerSlabMaterials[i];

        // Stronger hue sweep across spectrum
        const baseHue = 0.58 + i * 0.04;
        const hueDrift = 0.08 * Math.sin(phase * 0.6);
        const hue = (baseHue + hueDrift) % 1;

        const l = 0.55 + 0.15 * Math.sin(phase * 1.3);
        mat.color.setHSL(hue, 0.95, l);

        // Pulse the core thickness
        const s = 1 + 0.18 * Math.sin(phase * 1.6);
        group.children[1].scale.set(1, s, 1);
      });

      // Particles: slow drift
      const pos = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        pos.array[iy] += Math.sin(t * 0.14 + i * 0.35) * 0.0009;
        pos.array[iz] += 0.002;

        if (pos.array[iz] > 2) {
          pos.array[iz] = -10 - Math.random() * 6;
          pos.array[ix] = (Math.random() - 0.5) * 18;
          pos.array[iy] = (Math.random() - 0.5) * 8;
        }
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      scene.remove(particles);
      scene.remove(key);
      scene.remove(fill);
      scene.remove(ambient);
      slabGroups.forEach((group) => scene.remove(group));

      particleGeometry.dispose();
      particleMaterial.dispose();
      outerSlabGeometry.dispose();
      innerSlabGeometry.dispose();
      outerSlabMaterial.dispose();
      innerSlabMaterials.forEach((m) => m.dispose());

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="three-bg" />;
}
