import React from "react";
import { GridBackground } from "@/ui/GridBackground";
import { motion } from "framer-motion";

// 这里使用一个占位图，您可以替换为您实际的产品渲染图
// 推荐使用：深色背景、发光、等轴测视图(Isometric)的芯片、服务器或数据可视化仪表盘图片
const heroImage = "/products/test2.png";

export default function HeroSection() {
  return (
    <section className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.05] relative flex items-center justify-center transition-colors duration-300">
      {/* 动态背景遮罩：根据主题切换透明度方向 */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* 背景网格特效 */}
      <div className="absolute inset-0 pointer-events-none">
        <GridBackground />
      </div>

      {/* 内容区域：采用双栏布局 */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* 左侧：文案与行动号召 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center text-left"
          >
            <h2 className="text-sm md:text-base font-bold tracking-widest text-blue-500 uppercase mb-4">
              ► AERIAL INTELLIGENCE
            </h2>
            {/* 修改点：渐变色适配。明亮模式下从深灰色到更深的灰色，暗色模式保持白到灰的渐变 */}
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br dark:from-white dark:via-neutral-200 dark:to-neutral-500 from-neutral-900 via-neutral-700 to-neutral-500 leading-tight mb-6">
              Phoenixtech <br />
              <span className="text-4xl md:text-6xl">翎霄科技</span>
            </h1>
            {/* 修改点：文字颜色从固定 text-neutral-400 改为明暗适配 */}
            <p className="dark:text-neutral-400 text-neutral-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              提供高精度、高稳定的科研级无人机平台，以卓越的感测技术与自动化作业流，
              为无人机机构解锁各种需求的定制方案。
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
              href="/products"
              className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] inline-flex items-center justify-center" >
                探索产品
              </a>
              {/* 修改点：次要按钮边框色和文字色适配 */}
              <a 
                href="http://192.168.2.110:4322"
                className="px-8 py-4 rounded-lg border-2 dark:border-neutral-700 border-neutral-300 dark:text-neutral-300 text-neutral-700 font-bold text-base dark:hover:bg-neutral-800 hover:bg-neutral-100 dark:hover:text-white transition-all inline-flex items-center justify-center"
              >
                技术文档
              </a>
            </div>
          </motion.div>

          {/* 右侧：产品样式图 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* 图片容器，增加一个微妙的浮动动画和发光效果 */}
            <div className="relative w-full max-w-lg xl:max-w-xl animate-slow-float">
                {/* 核心产品图 */}
                <img 
                    src={heroImage}
                    alt="Astro Tech AI Chip Processor" 
                    className="w-full h-auto object-contain rounded-2xl pointer-events-none relative z-10 "
                />
                {/* 修改点：底部发光光晕在明亮模式下降低不透明度，防止过冲 */}
                <div className="absolute -inset-4 dark:bg-blue-600/20 bg-blue-400/10 blur-3xl rounded-full -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}