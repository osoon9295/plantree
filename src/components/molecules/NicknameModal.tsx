import useMyModalStore from '@/stores/my.modal.store';
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/supabase/client';
import useUserStore from '@/stores/user.store'; // 유저 상태 관리 스토어 추가

const NicknameModal: React.FC = () => {
  const { isNicknameModalOpen, toggleNicknameModal } = useMyModalStore((state) => state);
  const { nickname, setNickname } = useUserStore((state) => state); // 유저 상태 관리 스토어에서 닉네임 가져오기
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (user) {
          const { data, error } = await supabase.from('users').select('nickname').eq('id', user.id).single();
          if (error) {
            console.error('닉네임 페치 실패:', error);
          } else {
            console.log('닉네임 페치 성공:', data.nickname);
            if (data.nickname !== null) {
              setNickname(data.nickname); // 전역 상태에 닉네임 설정
            }
          }
        }
      } catch (error) {
        console.error('유저 가져오기 실패:', error);
      }
    };

    fetchNickname();
  }, [setNickname]);

  const handleBackGroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleNicknameModal();
    }
  };

  const handleNicknameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nicknameRef.current) {
      const newNickname = nicknameRef.current.value.trim();
      if (newNickname.length < 2 || newNickname.length > 8) {
        setError('닉네임은 최소 2글자, 최대 8글자입니다.');
        return;
      }

      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (user) {
          const { error } = await supabase.auth.updateUser({ data: { Display_Name: newNickname } });
          if (error) {
            console.error('닉네임 업데이트 실패:', error);
          } else {
            console.log('닉네임 업데이트 성공:', newNickname);
            setNickname(newNickname); // 전역 상태에 닉네임 업데이트
            toggleNicknameModal();
          }
        }
      } catch (error) {
        console.error('닉네임 업데이트 중 오류 발생:', error);
      }
    }
  };

  return (
    <>
      {isNicknameModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackGroundClick}
        >
          <div className="bg-white p-4 rounded-[10px]">
            <div onClick={(e) => e.stopPropagation()}>
              <h1 className="text-xl font-bold mb-4 text-left text-emerald-400">닉네임 변경하기</h1>
              <form className="flex flex-col gap-2" onSubmit={handleNicknameSubmit}>
                <input
                  type="text"
                  placeholder="새 닉네임 입력"
                  className="mb-4 p-2 border rounded w-full text-black"
                  ref={nicknameRef}
                  defaultValue={nickname ?? ''}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-2">
                  <button type="submit" className="px-4 py-2 bg-red-400 w-full text-white rounded">
                    저장
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    className="px-4 py-2 bg-red-400 w-full text-white rounded"
                    onClick={toggleNicknameModal}
                    type="button"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NicknameModal;
