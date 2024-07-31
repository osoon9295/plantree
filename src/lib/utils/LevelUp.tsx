'use client';

import { useEffect } from 'react';
import { supabase } from '@/supabase/client';
import useUserStore from '@/stores/user.store';

const LevelUp = () => {
  const { userId, attendance, setLevelName } = useUserStore((state) => state);

  useEffect(() => {
    const updateUserLevel = async (userId, attendance) => {
      const { data: levels, error: levelsError } = await supabase
        .from('level')
        .select('*')
        .order('attendance_requirement', { ascending: true });

      if (levelsError) {
        console.error('레벨 데이터 가져오기 실패:', levelsError);
        return;
      }

      let newLevelId = null;
      let newLevelName = null;
      for (const level of levels) {
        if (attendance >= level.attendance_requirement) {
          newLevelId = level.id;
          newLevelName = level.name;
        } else {
          break;
        }
      }

      if (newLevelId) {
        const { error: updateError } = await supabase.from('users').update({ level_id: newLevelId }).eq('id', userId);

        if (updateError) {
          console.error('사용자 레벨 업데이트 실패:', updateError);
        } else {
          setLevelName(newLevelName);
        }
      }
    };

    if (userId) {
      updateUserLevel(userId, attendance);
    }
  }, [userId, attendance, setLevelName]);

  return null;
};

export default LevelUp;