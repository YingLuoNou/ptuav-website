import React from "react";
import { motion } from "framer-motion";

interface Product {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const Features = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      /* 修改点：适配明暗模式背景与文字颜色 */
      <section className="py-20 dark:bg-neutral-950 bg-neutral-50 text-center dark:text-neutral-400 text-neutral-600 transition-colors duration-300">
        暂无展示产品，请在 src/pages/products/ 下添加带有 feature: true 的文档。
      </section>
    );
  }

  return (
    <section className="py-24 dark:bg-neutral-950 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          {/* 标题*/}
          <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-neutral-900 mb-6 tracking-tight">
            专业产品
          </h2>
          {/* 副标题*/}
          <p className="dark:text-neutral-400 text-neutral-600 text-lg max-w-2xl mx-auto">
            
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {products.map((product, idx) => (
            <motion.a
              key={idx}
              href={product.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              /* 修改点：卡片背景与边框颜色适配 */
              className="group block relative dark:bg-neutral-900 bg-neutral-50 border dark:border-white/10 border-neutral-200 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* 图片遮罩渐变色 */}
                <div className="absolute inset-0 bg-gradient-to-t dark:from-neutral-950 from-white/80 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 absolute bottom-0 left-0 w-full">
                {/* 产品标题*/}
                <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-blue-400 transition-colors">
                  {product.title}
                </h3>
                {/* 描述文字 */}
                <p className="dark:text-neutral-300 text-neutral-700 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                
                <div className="mt-4 flex items-center text-blue-500 text-xs font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  了解详情 <span className="ml-1">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};