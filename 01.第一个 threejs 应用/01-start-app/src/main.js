
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入 lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角 
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new THREE.BufferGeometry();
// 创建定点数据，顶点是有序的，每三个为一个顶点，逆时针为正面
// const vertices = new Float32Array([ 
//   -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 

//   1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
// ]);

// // 创建顶点属性
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// 使用索引绘制
const vertices = new Float32Array([ 
  -1.0, -1.0, 0.0, 
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0, 
  -1.0, 1.0, 0.0
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// 创建索引 利用第 0 1 2 个顶点 形成第一个三角形，利用2 3 0 个顶点 形成第二个三角形
const indices = new Uint16Array([
  0, 1, 2,
  2, 3, 0
])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
// 设置两个顶点组， 形成两个材质 
geometry.addGroup(0, 3, 0); // 从 顶点 0 开始 添加三个顶点 材质使用第 0 个
geometry.addGroup(3, 3, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side:THREE.DoubleSide,
  wireframe:true
});
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const plane = new THREE.Mesh(geometry, [material, material1]);
scene.add(plane);



const cubegeometry = new THREE.BoxGeometry(1, 1, 1);
const cubematerial0 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cubematerial1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cubematerial2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
const cubematerial3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const cubematerial4 = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const cubematerial5 = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});

const cube = new THREE.Mesh(cubegeometry,[cubematerial0, cubematerial1, cubematerial2, cubematerial3, cubematerial4, cubematerial5]);
cube.position.x = 2;
scene.add(cube);


// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼的系数
controls.dampingFactor = 0.05;
// 设置自动旋转
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;
// 渲染
function animate(){
  requestAnimationFrame(animate);

  // 旋转
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  
  // 更新轨道控制器状态
  controls.update()
  renderer.render(scene, camera);
}
animate();

// 监听窗口变化
window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
})