'use client';

import React from 'react';
import useMyModalStore from '@/stores/my.modal.store';
import BadgeModal from '../../components/molecules/BadgeModal';
import Garden from '@/components/templates/Garden';
import BadgeCollection from '@/components/templates/BadgeCollection';
import NicknameButton from '@/components/atoms/NicknameButton';
import AccountBar from '@/components/molecules/AccountBar';
import WithdrawalButton from '@/components/atoms/WithdrawalButton';
import NicknameModal from '@/components/molecules/NicknameModal';
import WithdrawalModal from '@/components/molecules/WithdrawalModal';
import BadgeCards from '@/components/molecules/BadgeCards';

const MyPage: React.FC = () => {
  const {
    isBadgeModalOpen,
    toggleBadgeModal,
    isNicknameModalOpen,
    toggleNicknameModal,
    isWithdrawalModalOpen,
    toggleWithdrawalModal
  } = useMyModalStore((state) => state);

  const handleToggleBadgeModal = () => {
    toggleBadgeModal();
  };
  const handleToggleNicknameModal = () => {
    toggleNicknameModal();
  };

  const handleToggleWithdrawalModal = () => {
    toggleWithdrawalModal();
  };

  return (
    <>
      <div>
        <Garden>
          <h2>씨앗 밍밍밍 님의 정원</h2>
          <p>플랜트리와 함께 100일째,</p>
          <p>열심히 나무를 키우고 계시네요!</p>
          <div className="bg-slate-300 w-[300px] h-[100px]">이미지 영역</div>
        </Garden>
      </div>
      <div>
        <BadgeCollection>
          <div>
            <div className="flex justify-around">
              <h2>획득한 배지</h2>
              <button className="bg-purple-400" onClick={handleToggleBadgeModal}>
                배지 전체 보기
              </button>
              {isBadgeModalOpen && <BadgeModal />}
            </div>
            <BadgeCards />
          </div>
        </BadgeCollection>
      </div>
      <NicknameButton>
        <div>
          <button onClick={handleToggleNicknameModal} className="bg-[#b6dff3] w-[300px] h-[100px]">
            닉네임 수정 버튼
          </button>
          {isNicknameModalOpen && <NicknameModal />}
        </div>
      </NicknameButton>
      <AccountBar>
        <div className="bg-[#eee2f3] w-[300px] h-[100px]">내가 account bar의 자식이다!!!!!!</div>
      </AccountBar>
      <WithdrawalButton>
        <div>
          <button onClick={handleToggleWithdrawalModal}>회원 탈퇴 버튼</button>
          {isWithdrawalModalOpen && <WithdrawalModal />}
        </div>
      </WithdrawalButton>
    </>
  );
};

export default MyPage;
