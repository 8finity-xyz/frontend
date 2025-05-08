
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import { useHover } from '../../store';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  chartData: ChartData<'pie', number[], string>;
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  const switchLabel = useHover((state) => state.switchLabel)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseLeave = () => {
      switchLabel('');
    };

    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => canvas.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const options: ChartOptions<'pie'> = {
    rotation: 180,
    animation: {
      animateRotate: true,
      animateScale: true
    },
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
      },
    },
    onHover: (event, elements) => {
      if (event) {

      }
      if (elements.length > 0) {
        const hoveredIndex = elements[0].index;
        const label = chartData.labels?.[hoveredIndex];
        if (label) {
          switchLabel(label)
        }
      }
    },
  };

  return <Pie
    ref={(ref) => {
      if (ref) canvasRef.current = ref.canvas;
    }}
    data={chartData}
    options={options}
  />;
};

interface DataItem {
  percent: number;
  name: string;
}

const Diagram: React.FC = () => {
  const Data: DataItem[] = [
    { percent: 46, name: 'Mining rewards' },
    { percent: 10, name: 'Treasury' },
    { percent: 20, name: 'Liquidity' },
    { percent: 23, name: 'WAGMI Community' },
  ];

  const chartData: ChartData<'pie', number[], string> = {
    labels: Data.map((data) => data.name),
    datasets: [
      {
        data: Data.map((data) => data.percent),
        backgroundColor: [
          '#70C3FF',
          '#005999',
          '#0075CB',
          '#3DADFF',
        ],
        hoverBackgroundColor: [
          '#FFF',
        ],
        borderColor: 'black',
        borderWidth: 7,
      },
    ],
  };

  return (
    <PieChart chartData={chartData} />
  );
};

export default Diagram;