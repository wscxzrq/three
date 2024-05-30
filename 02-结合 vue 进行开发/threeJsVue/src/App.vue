<script setup>
import * as three from 'three'
// 创建场景
const scene = new three.Scene();

// 创建相机
const camera = new three.PerspectiveCamera(
  45, // 视角 
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 创建渲染器
const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new three.BoxGeometry(1, 1, 1);

// 创建材质
const material = new three.MeshBasicMaterial({ color: 0x00ff00 });

// 创建网格
const cube = new three.Mesh(geometry, material);

// 将网格添加到场景
scene.add(cube);

// 设置相机位置
camera.position.z = 10;

// 渲染
function animate(){
  requestAnimationFrame(animate);

  // 旋转
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate()

</script>

<template>

</template>

<style scoped>

</style>
