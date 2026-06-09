"use client";

import { motion } from "framer-motion";

const Shape = ({ type, style, delay }: { type: string, style?: any, delay?: number }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileDrag={{ scale: 1.2, zIndex: 100 }}
      className={`shape ${type} shape-animated`}
      style={{ ...style, animationDelay: `${delay}s` }}
    />
  );
};

export default function Shapes() {
  return (
    <div className="shapes-container">
      <Shape type="triangle" style={{ transform: "rotate(-10deg)", marginRight: "-30px", zIndex: 5 }} delay={0} />
      <Shape type="semi" style={{ transform: "rotate(180deg)", marginRight: "-20px", zIndex: 4 }} delay={0.5} />
      <Shape type="triangle" style={{ transform: "rotate(30deg)", marginRight: "-15px", zIndex: 6 }} delay={0.2} />
      <Shape type="d-shape" style={{ transform: "rotate(-20deg)", marginRight: "-10px", zIndex: 3 }} delay={0.8} />
      <Shape type="circle" style={{ marginRight: "-25px", zIndex: 2 }} delay={1.2} />
      
      <div style={{ flexGrow: 1 }} />

      <Shape type="square" style={{ transform: "rotate(45deg)", marginBottom: "90px", marginRight: "40px" }} delay={1} />
      <Shape type="circle" style={{ transform: "scale(0.8)", marginRight: "30px" }} delay={2.5} />
      <Shape type="quarter" style={{ transform: "rotate(90deg)", marginBottom: "20px" }} delay={1.8} />
    </div>
  );
}
