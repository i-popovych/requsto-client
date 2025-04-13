import { ChatPlaceholder } from '@/assets/images';

export const SelectChat = () => {
  return (
    <div className='w-full items-center h-[100vh] flex flex-col gap-2'>
      <div className='text-3xl h-[70px]  flex items-end'>
        <div>Select chat and start messaging!</div>
      </div>
      <div className='h-full items-center justify-center flex mt-[-100px]'>
        <div>
          <img src={ChatPlaceholder} className='h-full max-h-[300px]' />
        </div>
      </div>
    </div>
  );
};
