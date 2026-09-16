import React from 'react';

const Button = ({ 
  variant = 'primary', 
  children, 
  icon: Icon,
  iconAnimation = 'translate', // 'translate' | 'scale'
  onClick, 
  className = '', 
  href,
  ...props 
}) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-primary/90 shadow-[0_0_40px_rgba(201,162,91,0.2)]",
    secondary: "bg-transparent border border-white/20 text-text-primary hover:border-primary/50 hover:bg-white/5 backdrop-blur-sm"
  };

  const getIconClasses = () => {
    let classes = "relative transition-transform ";
    if (iconAnimation === 'translate') {
      classes += "group-hover:translate-x-1";
    } else if (iconAnimation === 'scale') {
      classes += "group-hover:scale-110";
    }
    return classes;
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative">{children}</span>
      {Icon && (
        <Icon 
          size={16} 
          className={getIconClasses()} 
          strokeWidth={variant === 'primary' ? 2.5 : 2} 
        />
      )}
    </Component>
  );
};

export default Button;
