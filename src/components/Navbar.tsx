import React, { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconSun, IconMoon, IconChevronDown, IconCheck, IconCopy } from "@tabler/icons-react";
import { CONTACT_CONFIG } from "../config/contacts";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // 用于显示“已复制”的临时状态，key 为 platform 名称
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // 1. 滚动监听
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // 2. 主题初始化
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 3. 核心：智能渲染联系人单项
  const renderContactItem = (contact: typeof CONTACT_CONFIG[0], isMobile = false) => {
    const { platform, address, svg } = contact;
    
    // 识别类型
    const isLink = address.startsWith("http") || address.startsWith("mailto");
    // 简单正则判断手机号 (11位数字) 或 tel: 开头
    const isPhone = address.startsWith("tel:") || /^1[3-9]\d{9}$/.test(address); 
    // 纯数字 (用于复制)
    const isNumber = /^\d+$/.test(address) && !isPhone;

    // 处理点击复制
    const handleCopy = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // 防止冒泡
      navigator.clipboard.writeText(address);
      setCopiedState(platform);
      setTimeout(() => setCopiedState(null), 2000); // 2秒后重置
    };

    // 公共样式：适配明暗模式 + 移动端窄屏优化
    const itemClass = cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/item relative overflow-hidden",
      isMobile 
        ? "bg-neutral-50 dark:bg-white/5 border border-neutral-100 dark:border-white/5 w-full" 
        : "hover:bg-neutral-100 dark:hover:bg-white/5 w-full"
    );

    const iconClass = "p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors shrink-0";
    
    // 内容部分渲染函数
    const renderContent = () => (
      <>
        {/* 图标 */}
        <div className={iconClass}>
          {svg ? (
            <span dangerouslySetInnerHTML={{ __html: svg }} className="w-5 h-5 block" />
          ) : (
            <span className="font-bold text-xs">{platform[0]}</span>
          )}
        </div>
        
        {/* 文字信息 */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 truncate">
            {platform}
          </span>
          <span className="text-xs text-neutral-500 truncate font-mono opacity-80">
            {/* 如果是已复制状态，显示提示，否则显示具体地址/号码 */}
            {copiedState === platform ? (
              <span className="text-green-500 font-bold flex items-center gap-1">
                <IconCheck size={12} /> 已复制到剪贴板
              </span>
            ) : (
              address
            )}
          </span>
        </div>

        {/* 右侧指示图标 (复制图标或箭头) */}
        <div className="text-neutral-300 dark:text-neutral-600 group-hover/item:text-blue-500 transition-colors">
            {isNumber ? (
                 copiedState === platform ? <IconCheck size={16} className="text-green-500" /> : <IconCopy size={16} />
            ) : null}
        </div>
      </>
    );

    // 根据类型返回不同的标签
    if (isLink) {
      return (
        <a 
          key={platform} 
          href={address} 
          target="_blank" 
          rel="noreferrer" 
          className={itemClass}
        >
          {renderContent()}
        </a>
      );
    }
    
    if (isPhone) {
      // 自动补全 tel: 前缀
      const telHref = address.startsWith("tel:") ? address : `tel:${address}`;
      return (
        <a 
          key={platform} 
          href={telHref} 
          className={itemClass}
        >
          {renderContent()}
        </a>
      );
    }

    // 默认（纯数字/账号）：点击复制
    return (
      <div 
        key={platform} 
        onClick={handleCopy} 
        className={cn(itemClass, "cursor-pointer active:scale-[0.98]")}
      >
        {renderContent()}
      </div>
    );
  };

  const navItems = [
    { name: "首页", link: "/" },
    { name: "产品中心", link: "/products" },
    { name: "合作案例", link: "/cases" },
    { name: "关于我们", link: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-[5000] flex items-center justify-between px-6 py-4 md:px-10 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-neutral-200 dark:border-white/[0.1] shadow-lg" 
          : "bg-transparent border-transparent"
      )}
    >
      {/* 左侧：Logo */}
      <a href="/" className="flex items-center gap-2 cursor-pointer group">
        <img 
          src="/logo.png"  // 确保图片放在 public 目录下，或者使用 import 导入
          alt="Phoenixtech Logo"
          className="h-8 w-auto transition-transform group-hover:scale-105 shrink-0" 
        />
        <span className="text-neutral-800 dark:text-white font-bold text-xl tracking-tight hidden md:block">
          Phoenixtech
        </span>
      </a>

      {/* 中间：导航链接 (桌面端) */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="relative text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* 右侧：功能区 */}
      <div className="flex items-center gap-4">
        
        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors"
        >
          {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
        </button>

        {/* 桌面端：联系方式 (下拉菜单) */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 dark:bg-white/[0.1] hover:bg-black/10 dark:hover:bg-white/[0.2] border border-black/5 dark:border-white/[0.1] text-neutral-800 dark:text-white text-sm font-medium transition-all backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            联系方式
            <IconChevronDown size={16} className={`transition-transform duration-300 ${isContactOpen ? "rotate-180" : ""}`} />
          </button>

          {/* 下拉菜单 */}
          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-2 ring-1 ring-black/5 flex flex-col gap-1"
              >
                {CONTACT_CONFIG.map((contact) => renderContactItem(contact))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-neutral-800 dark:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* 移动端下拉菜单 (全屏/半屏折叠) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* 导航项 */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 py-2 border-b border-neutral-100 dark:border-white/5 last:border-0"
                >
                  {item.name}
                </a>
              ))}
              
              {/* 移动端联系方式列表 (改为垂直排列，适应窄屏) */}
              <div className="pt-4">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 block">联系方式</span>
                <div className="flex flex-col gap-3">
                  {CONTACT_CONFIG.map((contact) => renderContactItem(contact, true))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};