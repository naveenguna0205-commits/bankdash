import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * ExpenseStatisticsChart
 * Pixel-perfect SVG Pie Chart matching Figma design with interactive hover highlights,
 * dynamic center category readout, and exploded slice animations.
 */
export const ExpenseStatisticsChart = () => {
  const { isDarkMode } = useApp();
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const slices = [
    {
      id: 'entertainment',
      name: 'Entertainment',
      value: 30,
      amount: 10440,
      percent: '30%',
      color: isDarkMode ? '#0284C7' : '#1E293B',
      startAngle: 204,
      endAngle: 290,
      midAngle: 247,
      offset: 0
    },
    {
      id: 'bill',
      name: 'Bill Expense',
      value: 15,
      amount: 5220,
      percent: '15%',
      color: '#6366F1',
      startAngle: 298,
      endAngle: 348,
      midAngle: 323,
      offset: 14 // Exploded outward
    },
    {
      id: 'others',
      name: 'Others',
      value: 35,
      amount: 12180,
      percent: '35%',
      color: '#4F46E5',
      startAngle: 356,
      endAngle: 122,
      midAngle: 59,
      offset: 0
    },
    {
      id: 'investment',
      name: 'Investment',
      value: 20,
      amount: 6960,
      percent: '20%',
      color: '#7C3AED',
      startAngle: 128,
      endAngle: 198,
      midAngle: 163,
      offset: 0
    }
  ];

  const cx = 160;
  const cy = 160;
  const radius = 135;

  const polarToCartesian = (centerX, centerY, r, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians)
    };
  };

  const getSlicePath = (slice) => {
    let centerX = cx;
    let centerY = cy;

    // Apply explosion offset along mid-angle if configured or hovered
    const currentOffset = slice.offset + (hoveredSlice === slice.id ? 8 : 0);
    if (currentOffset > 0) {
      const midRad = ((slice.midAngle - 90) * Math.PI) / 180.0;
      centerX += currentOffset * Math.cos(midRad);
      centerY += currentOffset * Math.sin(midRad);
    }

    const start = polarToCartesian(centerX, centerY, radius, slice.endAngle);
    const end = polarToCartesian(centerX, centerY, radius, slice.startAngle);
    const diff = (slice.endAngle - slice.startAngle + 360) % 360;
    const largeArcFlag = diff <= 180 ? '0' : '1';

    return {
      d: [
        `M ${centerX} ${centerY}`,
        `L ${end.x} ${end.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${start.x} ${start.y}`,
        'Z'
      ].join(' '),
      labelPos: polarToCartesian(centerX, centerY, radius * 0.58, slice.midAngle)
    };
  };

  const activeSliceData = slices.find((s) => s.id === hoveredSlice);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
      <div className="relative w-full max-w-[280px] sm:max-w-[310px] flex items-center justify-center">
        <svg
          viewBox="0 0 320 320"
          className="w-full h-auto overflow-visible filter drop-shadow-sm transition-transform duration-300"
        >
          <defs>
            <filter id="sliceGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(79, 70, 229, 0.35)" />
            </filter>
          </defs>

          {slices.map((slice) => {
            const { d, labelPos } = getSlicePath(slice);
            const isHovered = hoveredSlice === slice.id;

            return (
              <g
                key={slice.id}
                className="cursor-pointer transition-all duration-300 group"
                onMouseEnter={() => setHoveredSlice(slice.id)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {/* Slice Polygon with hover shadow */}
                <path
                  d={d}
                  fill={slice.color}
                  stroke={isDarkMode ? '#131E36' : '#FFFFFF'}
                  strokeWidth={isHovered ? 4 : 3}
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered ? 'url(#sliceGlow)' : 'none',
                    transformOrigin: `${cx}px ${cy}px`
                  }}
                />

                {/* Centered In-Slice Labels: Percentage on top, Name underneath */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  className="pointer-events-none font-sans transition-all duration-200"
                >
                  <tspan
                    x={labelPos.x}
                    dy="-6"
                    className="font-bold text-[13px] sm:text-[14px]"
                    style={{ fontWeight: 700 }}
                  >
                    {slice.percent}
                  </tspan>
                  <tspan
                    x={labelPos.x}
                    dy="15"
                    className="font-semibold text-[10.5px] sm:text-[11.5px]"
                    style={{ fontWeight: 600, opacity: 0.95 }}
                  >
                    {slice.name}
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip Card at the bottom of chart if hovered */}
      <div className="h-6 mt-1 flex items-center justify-center">
        {activeSliceData ? (
          <span className="text-xs font-semibold text-[#1E293B] dark:text-[#F8FAFC] bg-slate-100/90 dark:bg-slate-800/90 px-3 py-0.5 rounded-full animate-fade-in-scale border border-transparent dark:border-slate-700">
            {activeSliceData.name}: <strong className="text-[#4F46E5] dark:text-[#818CF8]">${activeSliceData.amount.toLocaleString()}</strong> ({activeSliceData.percent})
          </span>
        ) : (
          <span className="text-[11px] text-slate-400 dark:text-slate-400">
            Hover over any category slice for details
          </span>
        )}
      </div>
    </div>
  );
};

export default ExpenseStatisticsChart;
