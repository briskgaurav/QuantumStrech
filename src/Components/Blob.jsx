"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float noiseFrequency;

  //	Classic Perlin 3D Noise 
  //	by Stefan Gustavson
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float pnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  uniform float uTime;
  void main() {
    float noise = pnoise(position*1.5 + vec3(uTime) * 2.0) * 1.2;
    float displacement = noise * noiseFrequency;
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 2.5;

    vUv = uv;
    vPosition = newPosition;
  }`;
const vertexShader2 = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float noiseFrequency;

  //	Classic Perlin 3D Noise 
  //	by Stefan Gustavson
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float pnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  uniform float uTime;
  void main() {
    float noise = pnoise(position*1.5 + vec3(uTime * 0.5, uTime * 2.0, -uTime) * 2.0) * .5;
    float displacement = (noise * noiseFrequency) * .8;
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = .1;
    vUv = uv;
    vPosition = newPosition;
  }`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    // Create gradient from top (y=1) to bottom (y=0)
    vec3 topColor = vec3(sin(uTime * 0.2) * 0.3 + 0.0, sin(uTime * 0.2) * 0.2 + 0.5, sin(uTime * 0.2) * 0.2 + 0.5); 
    vec3 bottomColor = vec3(
        step(0.66, fract(uTime * 0.2)) * 1.0 + step(0.33, fract(uTime * 0.2)) * step(fract(uTime * 0.2), 0.66) * vec3(1.0, 1.0, 0.8) + step(fract(uTime * 0.2), 0.33) * vec3(0.53, 0.81, 0.92)
    );
    
    // Mix colors based on y coordinate of UV with smoothstep
    float t = smoothstep(0., .8, vUv.y);
    vec3 color = mix(bottomColor, topColor, t);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
const fragmentShader2 = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    // Create gradient from top (y=1) to bottom (y=0)
    vec3 topColor = vec3(sin(uTime * 0.2) * 0.3 + 0.0, sin(uTime * 0.2) * 0.2 + 0.5, sin(uTime * 0.2) * 0.2 + 0.5); 
    vec3 bottomColor = vec3(
        step(0.66, fract(uTime * 0.2)) * 1.0 + step(0.33, fract(uTime * 0.2)) * step(fract(uTime * 0.2), 0.66) * vec3(1.0, 1.0, 0.8) + step(fract(uTime * 0.2), 0.33) * vec3(0.53, 0.81, 0.92)
    );
    
    // Mix colors based on y coordinate of UV with smoothstep
    float t = smoothstep(0., .8, vUv.y);
    vec3 color = mix(topColor, bottomColor, t);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function Blob() {
  const meshRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen w-screen fixed inset-0">
      <Canvas className="rounded-4xl">
        <ambientLight />
        <BlobMesh isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

const BlobMesh = ({ isMobile }) => {
  const { viewport } = useThree();
  const scale = isMobile ? 0.8 : 1;
  const meshRefs = {
    icosahedron: useRef(),
    sphere: useRef(),
    plane: useRef(),
    solidSphere: useRef(),
    cylinder: useRef(),
    stars: useRef(),
  };

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        noiseFrequency: { value: 0.2 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: false,
      depthWrite: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);
  const shaderMaterial2 = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        noiseFrequency: { value: 0.2 },
      },
      vertexShader: vertexShader2,
      fragmentShader: fragmentShader2,
      side: THREE.DoubleSide,
      transparent: false,
      depthWrite: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(() => {
    shaderMaterial.uniforms.uTime.value += 0.01;
    shaderMaterial2.uniforms.uTime.value += 0.01;
    if (meshRefs.stars.current && meshRefs.stars.current.material) {
      meshRefs.stars.current.material.uniforms.uTime.value += 0.005;
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ico = meshRefs.icosahedron.current;
      const sph = meshRefs.sphere.current;
      const pln = meshRefs.plane.current;
      const solidSphere = meshRefs.solidSphere.current;
      const cyl = meshRefs.cylinder.current;
      const stars = meshRefs.stars.current;

      if (!ico || !sph || !pln) return;

      const scrollConfig = {
        mobile: {
          scale: 0.6,
          position: { x: -3, y: -1 },
          planeScale: { x: 1.5, y: 2, z: 1.5 },
        },
        desktop: {
          scale: 1.8,
          position: { x: -6, y: -2 },
          planeScale: { x: 2, y: 3, z: 2 },
        }
      };

      const config = isMobile ? scrollConfig.mobile : scrollConfig.desktop;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: isMobile ? "+500 top" : "+1000 top",
          scrub: true,
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#performance3",
          start: "top 100%",
          end: isMobile ? "+300 top" : "+500 top",
          scrub: true,
        },
      });

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#puncture-resitance",
          start: "top 80%",
          end: isMobile ? "+500 top" : "+1000 top",
          scrub: true,
        },
      });

      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: "#clingestringe",
          start: "top 80%",
          end: isMobile ? "+500 top" : "+1000 top",
          scrub: true,
        },
      });

      const tl5 = gsap.timeline({
        scrollTrigger: {
          trigger: "#technical-specifications",
          start: "top top",
          end: isMobile ? "+500 top" : "+1000 top",
          scrub: true,
          pin: true,
        },
      });

      // Adjust animations based on viewport
      tl.to(ico.scale, { x: config.scale, y: config.scale, z: config.scale, duration: 2, ease: "linear" }, "<");
      tl.to(ico.position, { x: config.position.x, y: config.position.y, duration: 5, ease: "linear" }, "<");

      tl2.to(ico.position, { x: 0, y: 0, z: 0, duration: 3 });
      tl2.to(ico.scale, { x: 0.5 * scale, y: 0.5 * scale, z: 0.5 * scale, duration: 3 }, "<");
      tl2.to(ico.scale, { x: 0.8 * scale, y: 0.8 * scale, z: 0.8 * scale, duration: 3 });

      tl3.to(ico.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        delay: 1,
        onComplete: () => {
          gsap.to(shaderMaterial.uniforms.noiseFrequency, {
            value: 0.5,
            duration: 0.5,
            ease: "linear",
          });
        },
      });

      tl3.to(ico.scale, { x: 0, y: 0, z: 0, duration: 3, delay: 1 });
      tl3.to(pln.scale, {
        x: config.planeScale.x,
        y: config.planeScale.y,
        z: config.planeScale.z,
        duration: 3,
        delay: 2,
        onReverseComplete: () => {
          gsap.to(shaderMaterial.uniforms.noiseFrequency, {
            value: 0.2,
            duration: 0.5,
            ease: "linear",
          });
        },
      });

      tl3.to(pln.rotation, { z: degToRad(-120), duration: 10, delay: 2 }, "<");
      tl3.to(pln.scale, { x: 5 * scale, duration: 3 }, "<");

      tl4.to(pln.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        delay: 3,
      });

      tl4.to(sph.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 3,
        onComplete: () => {
          gsap.to(shaderMaterial.uniforms.noiseFrequency, {
            value: 0.0,
            duration: 0.5,
            delay: -2,
            ease: "linear",
          });
        },
      }, "<+1");

      tl4.to(solidSphere.scale, {
        x: 0.95 * scale,
        y: 0.95 * scale,
        z: 0.95 * scale,
        duration: 4,
        onReverseComplete: () => {
          gsap.to(shaderMaterial.uniforms.noiseFrequency, {
            value: 0.8,
            duration: 0.5,
            ease: "linear",
          });
        },
      }, "<");

      tl4.to(sph.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: 3,
        ease: "linear",
        onComplete: () => {
          gsap.to(shaderMaterial.uniforms.noiseFrequency, {
            value: 0.5,
            duration: 0.5,
          });
        },
      });

      tl5.to(sph.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: "linear",
      });

      tl5.to(solidSphere.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: "linear",
      }, "<");

      tl5.to(cyl.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 3,
        delay: 1,
        ease: "linear",
      });

      tl5.to(cyl.rotation, {
        x: 0,
        y: Math.PI / 3,
        z: 0,
        duration: 3,
        delay: 0.5,
        ease: "linear",
      });

      tl5.to(cyl.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        delay: 1,
        ease: "linear",
      });

      tl5.to(ico.scale, {
        x: 0.5 * scale,
        y: 0.5 * scale,
        z: 0.5 * scale,
        duration: 10,
        pin: false,
        ease: "linear",
      });

      gsap.to(sph.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: 3,
        delay: 20,
        ease: "linear",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [isMobile, scale]);

  return (
    <>
      <EffectComposer>
        <Bloom
          intensity={isMobile ? 0.15 : 0.2}
          luminanceThreshold={0.5}
          luminanceSmoothing={1}
          height={window.innerHeight}
          width={window.innerWidth}
          kernelSize={3}
          mipmapBlur={true}
        />
      </EffectComposer>

      {/* Stars BG Points */}
      <mesh ref={meshRefs.stars} scale={scale}>
        <sphereGeometry args={[10, isMobile ? 32 : 64]} />
        <shaderMaterial
          uniforms={{ uTime: { value: 0 } }}
          fragmentShader={`
            uniform float uTime;
            void main() {
              vec2 uv = gl_FragCoord.xy / vec2(50.0);
              float angle = uTime * 0.5;
              mat2 rotation = mat2(
                cos(angle), -sin(angle),
                sin(angle), cos(angle)
              );
              uv = rotation * (uv - vec2(25.0)) + vec2(25.0);
              vec2 pos = mod(uv, 15.0);
              float square = smoothstep(0.05, 0.15, pos.x) * 
                            smoothstep(0.5, 0.25, pos.x) * 
                            smoothstep(0.05, 0.15, pos.y) * 
                            smoothstep(0.35, 0.25, pos.y);
              vec3 color = vec3(square);
              gl_FragColor = vec4(color, 1.0);
            }
          `}
          vertexShader={`
            uniform float uTime;
            void main() {
              vec3 pos = position;
              pos.z += sin(pos.x * 2.0 + uTime) * 0.2;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point Geometries */}
      <group scale={scale}>
        <group ref={meshRefs.icosahedron}>
          <points visible={true}>
            <icosahedronGeometry args={[2, isMobile ? 8 : 12]} />
            <primitive object={shaderMaterial} attach="material" />
          </points>

          <points visible={true} rotation={[degToRad(100), 0, 0]}>
            <icosahedronGeometry args={[1.9, isMobile ? 8 : 12]} />
            <primitive object={shaderMaterial2} attach="material" />
          </points>
        </group>

        <points visible={true} scale={0} ref={meshRefs.sphere}>
          <icosahedronGeometry args={[2, isMobile ? 8 : 10]} />
          <primitive object={shaderMaterial} attach="material" />
        </points>

        <mesh visible={true} scale={0} ref={meshRefs.solidSphere}>
          <sphereGeometry args={[2, isMobile ? 8 : 12]} />
          <meshStandardMaterial
            color="teal"
            emissive="teal"
            emissiveIntensity={0.5}
          />
        </mesh>

        <points
          visible={true}
          ref={meshRefs.plane}
          scale={0}
          rotation={[degToRad(100), 0, 0]}
        >
          <planeGeometry args={[2, 2, isMobile ? 30 : 50, isMobile ? 30 : 50]} />
          <planeGeometry args={[2, 2, 50, 50]} />
          <primitive object={shaderMaterial} attach="material" />
        </points>

        <group visible={true} scale={0} ref={meshRefs.cylinder}>
          <mesh position={[-0.5, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial
              color="teal"
              emissive="teal"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh position={[0, 0.25, 0.9]}>
            <cylinderGeometry args={[0.4, 0.4, 2.5, 32]} />
            <meshStandardMaterial
              color="teal"
              emissive="teal"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh position={[0.5, -0.3, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
            <meshStandardMaterial
              color="teal"
              emissive="teal"
              emissiveIntensity={2}
            />
          </mesh>
        </group>
      </group>
    </>
  );
};
