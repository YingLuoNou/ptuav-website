import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

// 1. 更新接口定义，增加 url 字段
interface CaseItem {
  title: string;
  category: string;
  description: string;
  image: string;
  url: string; // 新增
}

export function Cases({ items }: { items: CaseItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    /* 修改点：适配明暗模式背景颜色，增加 transition 平滑切换 */
    <section id="cases" className="py-20 dark:bg-neutral-950 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* 修改点：标题文字颜色适配 */}
        <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-neutral-900 text-center mb-12">
          客户成功案例
        </h2>
        
        {/* 核心修改点：响应式 Grid 布局 
           grid-cols-1      : 手机端 1 列
           md:grid-cols-2   : 平板/小屏笔记本 2 列
           xl:grid-cols-3   : 大屏桌面 3 列
           gap-6            : 保持较紧凑的间距
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <CaseCard 
              key={index}
              {...item} // 直接展开传递所有属性 (含 url)
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. 更新 CaseCard 组件接收 props
const CaseCard = ({ title, category, description, image, url }: any) => {
  return (
    <CardContainer className="inter-var">
      {/* 调整点：w-[30rem] 缩小为 w-[26rem] 以减少横向空隙 */}
      <CardBody className="bg-neutral-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-neutral-200 w-auto sm:w-[26rem] h-auto rounded-xl p-6 border transition-colors duration-300">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {category}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="div"
            className="px-4 py-2 rounded-xl text-xs font-normal text-neutral-600 dark:text-white"
          >
            {description}
          </CardItem>
          
          {/* 3. 核心修改：保持 a 标签逻辑，适配明亮模式下的按钮配色 */}
          <CardItem
            translateZ={20}
            as="a" 
            href={url}
            className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer transition-colors whitespace-nowrap"
          >
            查看详情
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};