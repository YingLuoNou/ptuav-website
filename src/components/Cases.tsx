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
    <section id="cases" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
          客户成功案例
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {category}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={image} // 注意这里用了 image 属性名
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
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {description}
          </CardItem>
          
          {/* 3. 核心修改：将 button 改为 a 标签，并绑定 href */}
          <CardItem
            translateZ={20}
            as="a" 
            href={url}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer"
          >
            查看详情
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};