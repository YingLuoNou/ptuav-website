import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote?: string; // 修改：改为可选
    name: string;
    title?: string; // 修改：改为可选
    image: string;  // 修复：添加 image 字段定义
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative flex-shrink-0 flex items-center"
            key={item.name}
          >
            {/* Logo 容器 */}
            <div className="px-12 py-4 flex items-center justify-center min-w-[180px]">
              <img
                src={item.image}
                alt={item.name}
                // 添加 hover:scale-110 (放大1.1倍) 
                // transition-transform (仅对变换应用动画)
                // duration-300 (动画持续300ms)
                className="h-10 md:h-12 w-auto object-contain brightness-100 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" 
              />
            </div>

            {/* 分隔竖线 */}
            {idx !== items.length - 1 && (
              <div className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-800 self-center" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
