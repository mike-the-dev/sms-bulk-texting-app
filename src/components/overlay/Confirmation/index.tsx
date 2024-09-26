import { useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import Example from '../../lottie/Example';

interface TimerProps {
  toggleConfirmation: () => void;
};

const Confirmation: React.FC<TimerProps> = (props): React.ReactElement => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      props.toggleConfirmation();
      return;
    };

    const timeout = setTimeout(() => {
      setTimer(prevState => prevState - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div className='singing-out-container'>
      <div className='inner-container'>
        <div className="w-full lg pb-0 shadow-lg rounded-md" style={{ width: 512, overflow: 'hidden', position: 'relative' }}>
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <Example />
            </div>
            <div>
              <div className="block text-3xl font-bold text-gray-700">
                Messages are in route!
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'inline-block', marginBottom: 4 }}>
                <div className="block text-base font-base text-gray-500">
                  The SMS texting process has started, please wait for the report via email.
                </div>
              </div>
            </div>
          </div>
          {/* Timer */}
          <div style={{ position: 'absolute', top: 5, right: 11, opacity: 0.4 }} className="block text-base font-base text-neutral-300">{timer}</div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;