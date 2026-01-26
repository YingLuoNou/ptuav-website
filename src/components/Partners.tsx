import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { PARTNERS_CONFIG } from "../config/partners"; // 导入配置

export function Partners() {
  // 将配置数据转换为组件需要的 items 格式
  // 既然你只想显示图片，我们将 logo 映射到组件预期的内容字段
  const partnerItems = PARTNERS_CONFIG.map((partner) => ({
    image: partner.logo,
    name: partner.name,
    // 如果底层组件需要 quote/title 字段，可传空字符串
    quote: "", 
    title: "",
  }));

  return (
    /* 修改点：
       1. 背景色：从 bg-black 改为 bg-white dark:bg-black
       2. 网格背景：增加 bg-grid-black/[0.03] 以适配明亮模式，并保持暗色模式下的网格
       3. 增加 transition-colors 确保切换平滑
    */
    <section className="py-20 rounded-md flex flex-col antialiased bg-white dark:bg-black bg-grid-black/[0.03] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden transition-colors duration-300">
        {/* 修改点：标题颜色从 text-neutral-400 改为适配明亮的 text-neutral-500 和暗色的 text-neutral-400 */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-500 dark:text-neutral-400 mb-10 transition-colors">
          合作伙伴
        </h2>
      <InfiniteMovingCards
        items={partnerItems}
        direction="left"
        speed="normal"
      />
    </section>
  );
}