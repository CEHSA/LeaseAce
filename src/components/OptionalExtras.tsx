import { type FC } from 'react';
import { optionalExtras } from '../constants/optionalExtras';

interface OptionalExtrasProps {
  selectedExtras: string[];
  onExtraChange: (extraId: string, isSelected: boolean) => void;
  baseRent: number;
}

const OptionalExtras: FC<OptionalExtrasProps> = ({
  selectedExtras,
  onExtraChange,
  baseRent
}) => {
  const calculateTotals = (): {
    monthlyExtras: number;
    onceOffExtras: number;
    totalMonthly: number;
  } => {
    const selectedItems = optionalExtras.filter(extra => selectedExtras.includes(extra.id));
    const monthlyExtras = selectedItems
      .filter(extra => extra.isMonthly)
      .reduce((sum, extra) => sum + extra.price, 0);
    const onceOffExtras = selectedItems
      .filter(extra => !extra.isMonthly)
      .reduce((sum, extra) => sum + extra.price, 0);
    const totalMonthly = baseRent + monthlyExtras;

    return {
      monthlyExtras,
      onceOffExtras,
      totalMonthly
    };
  };

  const { monthlyExtras, onceOffExtras, totalMonthly } = calculateTotals();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#2C3E50]">Optional Extras</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {optionalExtras.map(extra => (
          <div
            key={extra.id}
            className="flex items-start space-x-3 p-3 border rounded-lg hover:border-[#E67E22] transition-colors"
          >
            <input
              type="checkbox"
              id={extra.id}
              checked={selectedExtras.includes(extra.id)}
              onChange={(e) => onExtraChange(extra.id, e.target.checked)}
              className="mt-1 h-4 w-4 text-[#E67E22] border-gray-300 rounded focus:ring-[#E67E22]"
            />
            <label htmlFor={extra.id} className="flex-1 cursor-pointer">
              <div className="font-medium text-[#2C3E50]">{extra.name}</div>
              <div className="text-sm text-gray-600">
                R{extra.price} {extra.isMonthly ? '/month' : 'once-off'}
              </div>
              {extra.description && (
                <div className="text-sm text-gray-500">{extra.description}</div>
              )}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="flex justify-between text-[#2C3E50]">
          <span>Base Rent:</span>
          <span>R{baseRent}/month</span>
        </div>
        {monthlyExtras > 0 && (
          <div className="flex justify-between text-[#2C3E50]">
            <span>Monthly Extras:</span>
            <span>R{monthlyExtras}/month</span>
          </div>
        )}
        {onceOffExtras > 0 && (
          <div className="flex justify-between text-[#2C3E50]">
            <span>Once-off Extras:</span>
            <span>R{onceOffExtras}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg text-[#2C3E50] border-t pt-2">
          <span>Total Monthly Rent:</span>
          <span>R{totalMonthly}/month</span>
        </div>
        {onceOffExtras > 0 && (
          <div className="text-sm text-gray-500 italic">
            * Plus R{onceOffExtras} once-off payment for selected extras
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionalExtras;