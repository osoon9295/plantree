'use client';

import { MainSidebarProps } from '@/types/main';
import React, { useEffect } from 'react';
import { cards } from '../templates/DiaryCase';
import Link from 'next/link';
import { DiAptana } from 'react-icons/di';
import { supabase } from '../../supabase/client';
import useUserStore from '@/stores/user.store'; // 유저 상태 관리 스토어 추가
import AttendanceCheck from './AttendanceCheck';

const Sidebar: React.FC<MainSidebarProps> = ({ onClose }) => {
  const { nickname, setNickname, levelName, setLevelName, attendance } = useUserStore((state) => state); // 유저 상태 관리 스토어에서 닉네임 및 레벨 이름 가져오기

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        const { data: nicknameData, error: nicknameError } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', user.id)
          .single();
        if (nicknameError) {
          console.error('닉네임 가져오기 실패:', nicknameError);
        } else {
          setNickname(nicknameData.nickname); // 전역 상태에 닉네임 설정
        }

        const { data: levelData, error: levelError } = await supabase
          .from('users')
          .select('level_id')
          .eq('id', user.id)
          .single();
        if (levelError) {
          console.error('레벨 가져오기 실패:', levelError);
        } else if (levelData.level_id) {
          const { data: levelNameData, error: levelNameError } = await supabase
            .from('level')
            .select('name')
            .eq('id', levelData.level_id)
            .single();
          if (levelNameError) {
            console.error('레벨 이름 가져오기 실패:', levelNameError);
          } else {
            setLevelName(levelNameData.name); // 전역 상태에 레벨 이름 설정
          }
        }
      }
    };

    fetchUserData();
  }, [setNickname, setLevelName]);

  return (
    <div className="w-[260px] h-[930px] bg-gray-700 text-white flex-shrink-0">
      <div className="p-4">
        <AttendanceCheck />
        <button onClick={onClose} className="mb-4 text-[20px]">
          Close
        </button>
        <nav>
          <ul className="flex flex-col items-center justify-center">
            <li className="w-[240px] h-[300px] bg-black mb-4 flex justify-end items-start relative">
              <Link href="/member/mypage">
                <DiAptana size={30} className="text-white absolute top-3 right-3" />
              </Link>
              <div className="flex flex-col items-center mb-10">
                <div className="w-[120px] h-[120px] bg-white rounded-full mb-2"></div> {/* 프로필 이미지 영역 */}
                <span className="text-white text-lg font-bold">{nickname || 'Guest'}</span>
                <div className="text-white text-sm">{levelName || 'Level not set'}</div>
                <div className="text-white text-sm">출석 횟수: {attendance}</div>
                <div className="text-white text-sm">열심히 나무를 키워보세요!</div>
              </div>
            </li>
            {cards.map((card) => (
              <li
                key={card.id}
                className="w-[240px] h-[100px] bg-white text-black rounded-[20px] font-bold mb-4 flex items-center justify-center rounded shadow-md"
              >
                <p className="text-center">{card.name}</p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
