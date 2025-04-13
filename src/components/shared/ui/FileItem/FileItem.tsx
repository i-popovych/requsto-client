import { FC } from 'react';
import { FaFileAlt, FaImage } from 'react-icons/fa';

import { getStaticFileRoute } from '@/helpers/static/getStaticRoute';

type Props = {
  fileName: string;
  filePath?: string;
};

export const FileItem: FC<Props> = ({ fileName, filePath }) => {
  const onClick = () => {
    if (!filePath) return;

    window.open(getStaticFileRoute(filePath), '_blank');
  };

  const fileExtension = fileName.split('.').pop();

  const FileImage = fileExtension === 'png' ? FaImage : FaFileAlt;

  return (
    <div onClick={onClick} className='flex gap-2 items-center'>
      <div>
        <FileImage size={24} color='#4341da' />
      </div>
      <div>{fileName}</div>
    </div>
  );
};
