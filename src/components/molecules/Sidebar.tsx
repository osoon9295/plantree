'use client';

import { MainSidebarProps } from '@/types/main';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../supabase/client';
import { DiAptana } from 'react-icons/di';

const Sidebar: React.FC<MainSidebarProps> = ({ onClose }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [diaries, setDiaries] = useState<any[]>([]); // 다이어리 목록 상태 추가

  useEffect(() => {
    const fetchNicknameAndDiaries = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        // 사용자 닉네임 가져오기
        const { data: nicknameData, error: nicknameError } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', user.id)
          .single();

        if (nicknameError) {
          console.error('닉네임 가져오기 실패:', nicknameError);
        } else {
          setNickname(nicknameData.nickname);
        }

        // 다이어리 목록 가져오기
        const { data: diariesData, error: diariesError } = await supabase
          .from('diaries')
          .select('id, name') // id와 name만 선택하여 가져옵니다
          .eq('user_id', user.id)
          .order('bookshelf_order', { ascending: true });

        if (diariesError) {
          console.error('다이어리 목록 가져오기 실패:', diariesError);
        } else {
          setDiaries(diariesData || []);
        }
      } else {
        setNickname('Guest');
      }
    };

    fetchNicknameAndDiaries();
  }, []);

  return (
    <div className="w-[320px] h-[930px] bg-gray-700 text-white flex-shrink-0">
      <div className="p-4">
        <button onClick={onClose} className="mb-4 text-[20px]">
          Close
        </button>
        <nav>
          <ul className="flex flex-col items-center justify-center space-y-4">
            <li className="w-[240px] h-[300px] bg-black rounded-[20px] mb-4 flex flex-col items-center justify-center relative">
              <Link href="/member/mypage">
                <DiAptana size={30} className="text-white absolute top-3 right-3" />
              </Link>
              <div className="flex flex-col items-center mb-10">
                <div className="w-[120px] h-[120px] bg-white rounded-full mb-2"></div> {/* 프로필 이미지 영역 */}
                <span className="text-white text-lg font-bold">{nickname}</span>
              </div>
            </li>
            <div className="w-full bg-gray-800 p-4 rounded-lg">
              <p className="text-lg font-bold mb-2 text-center">리스트</p>
              <ul className="list-none space-y-2">
                {diaries.length > 0 ? (
                  diaries.map((diary) => (
                    <li key={diary.id} className="bg-gray-600 p-2 rounded-lg shadow-md">
                      {diary.name}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-center">다이어리가 없습니다.</li>
                )}
              </ul>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
