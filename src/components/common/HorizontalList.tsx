import React from "react";
import "./Common.css";

interface HorizontalListProps {
  title: string;
  list: string[] | number[];
}

const HorizontalList: React.FC<HorizontalListProps> = ({ title, list }) => {
  return (
    <div>
      <label>
        {title}
        {list?.map((value: string | number, index: number) => {
          return <span key={index}>{value}</span>;
        })}
      </label>
    </div>
  );
};

export default HorizontalList;
