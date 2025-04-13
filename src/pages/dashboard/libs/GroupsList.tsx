import { FC } from 'react';

import { useAppSelector } from '@/redux/hooks';

import { Group } from '../../../entities/Group';
import { GroupItem } from './GroupItem';

type Props = {
  groups: Group[];
  handleGroupClick: (group: Group) => void;
};

export const GroupsList: FC<Props> = ({ groups, handleGroupClick }) => {
  const { currentGroup } = useAppSelector((state) => state.group);

  const renderGroups = () => {
    return groups.map((group) => (
      <GroupItem
        key={group.id}
        group={group}
        handleGroupClick={handleGroupClick}
        isSelected={currentGroup?.id === group.id}
      />
    ));
  };

  return <div className='max-w-[600px] w-full flex flex-col '>{renderGroups()}</div>;
};
