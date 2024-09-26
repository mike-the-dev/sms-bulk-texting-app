import { Label, LabelDescription } from '../../label';

const SigningOut: React.FC = (): React.ReactElement => {

  const isSyncing: boolean = true;

  return (
    <div className='singing-out-container'>
      <div className='inner-container'>
        <div className="w-full lg pb-0 shadow-lg rounded-md" style={{ width: 512, overflow: 'hidden' }}>
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <Label text="Catch you later!" htmlFor="text_message" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'inline-block' }}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke={isSyncing ? 'violet' : 'transparent'} strokeWidth="4"></circle>
                  <path className="opacity-75" fill={isSyncing ? 'violet' : 'transparent'} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div style={{ display: 'inline-block', marginBottom: 4 }}>
                <LabelDescription description="We are logging you out..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigningOut;