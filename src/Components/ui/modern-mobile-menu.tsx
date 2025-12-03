import React, { useState, useRef, useEffect, useMemo } from "react";
import { Home, Briefcase, Calendar, Shield, Settings } from "lucide-react";

type IconComponentType = React.ElementType<{ className?: string }>;
export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
  path?: string;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Upload", icon: Briefcase, path: "/dashboard/upload" },
  { label: "History", icon: Calendar, path: "/dashboard/history" },
  { label: "Reports", icon: Shield, path: "/dashboard/reports" },
];

const defaultAccentColor = "var(--component-active-color-default)";

import { useNavigate } from "react-router-dom";

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  items,
  accentColor,
}) => {
  const navigate = useNavigate();
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
    if (!isValid) {
      console.warn(
        "InteractiveMenu: 'items' prop is invalid or missing. Using default items.",
        items
      );
      return defaultItems;
    }
    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= finalItems.length) {
      setActiveIndex(0);
    }
  }, [finalItems, activeIndex]);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];

      if (activeItemElement && activeTextElement) {
        const textWidth = activeTextElement.offsetWidth;
        activeItemElement.style.setProperty("--lineWidth", `${textWidth}px`);
      }
    };

    setLineWidth();

    window.addEventListener("resize", setLineWidth);
    return () => {
      window.removeEventListener("resize", setLineWidth);
    };
  }, [activeIndex, finalItems]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    const item = finalItems[index];
    if (item?.path) navigate(item.path);
  };

  const navStyle = useMemo(() => {
    const activeColor = accentColor || defaultAccentColor;
    return { "--component-active-color": activeColor } as React.CSSProperties;
  }, [accentColor]);

  return (
    <nav
      className="menu w-full max-w-md mx-auto"
      role="navigation"
      style={navStyle}
    >
      <div className="flex items-center justify-between bg-white shadow-md rounded-t-xl px-2 py-2">
        {finalItems.map((item, index) => {
          const isActive = index === activeIndex;
          const isTextActive = isActive;

          const IconComponent = item.icon;

          return (
            <button
              key={item.label}
              className={`menu__item flex-1 text-center ${
                isActive ? "active" : ""
              }`}
              onClick={() => handleItemClick(index)}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              style={{ "--lineWidth": "0px" } as React.CSSProperties}
            >
              <div className="menu__icon flex items-center justify-center">
                <IconComponent className="icon text-slate-700" />
              </div>
              <strong
                className={`menu__text block text-xs mt-1 ${
                  isTextActive ? "active text-slate-900" : "text-slate-500"
                }`}
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
              >
                {item.label}
              </strong>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export { InteractiveMenu };
