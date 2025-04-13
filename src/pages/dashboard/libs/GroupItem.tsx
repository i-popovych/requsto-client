import { FC } from 'react';
import { MdGrid3X3 } from 'react-icons/md';

import { Group } from '../../../entities/Group';

type Props = {
  group: Group;
  handleGroupClick: (group: Group) => void;
  isSelected: boolean;
};

export const GroupItem: FC<Props> = ({ group, handleGroupClick, isSelected }) => {
  const onGroupSelect = () => {
    handleGroupClick(group);
  };

  const color = isSelected ? 'white' : '#d5d2d2';

  return (
    <div
      className='flex gap-2 items-center text-lg hover:drop-shadow cursor-pointer group-item_hover'
      onClick={onGroupSelect}
    >
      <div>
        <MdGrid3X3 fill={color} />
      </div>
      <div className={`group-name hover:underline`} style={{ color }}>
        {group.group_name}
      </div>
    </div>
  );
};
