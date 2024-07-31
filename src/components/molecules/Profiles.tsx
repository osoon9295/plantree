'use client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import useUserStore from '@/stores/user.store';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

const Profiles = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Key.');
  }

  const profileMap: { [key: string]: number } = {
    lv1: 1,
    lv2: 2,
    lv3: 3,
    lv4: 4,
    lv5: 5,
    lv6: 6
  };

  const ProfilesStages = () => {
    const [profilesStages, setProfilesStages] = useState([
      {
        id: 1,
        content: <Image src="/images/lv1_img.png" alt="badge_example" width="600" height="300" />,
        name: '씨앗'
      },
      {
        id: 2,
        content: <Image src="/images/lv2_img.png" alt="badge_example" width="600" height="300" />,
        name: '새싹'
      },
      { id: 3, content: <Image src="/images/lv3_img.png" alt="badge_example" width="600" height="300" />, name: '풀' },
      {
        id: 4,
        content: <Image src="/images/lv4_img.png" alt="badge_example" width="600" height="300" />,
        name: '묘목'
      },
      { id: 5, content: 'Stage5의 url', name: '나무' },
      { id: 6, content: 'Stage6의 url', name: '열매나무' }
    ]);

    const [displayStages, setDisplayStages] = useState([]);

    const { levelName } = useUserStore((state) => state);

    useEffect(() => {
      const fetchUserEmailAndLevel = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          console.error('Session fetching error:', sessionError);
          return;
        }

        const { email } = sessionData.session.user;
        const { data, error } = await supabase.from('users').select('level_id').eq('email', email).single();

        if (error) {
          console.error('level_id fetching error:', error);
          return;
        }

        const levelId = data?.level_id;
        const maxLevel = levelId ? levelMap[levelId] : 1;
        setDisplayStages(gardenStages.slice(0, maxLevel));
      };

      fetchUserEmailAndLevel();
    }, [gardenStages, levelName]);

    return (
      <div className=" w-[630px] h-[350px]">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
        >
          {displayStages.map((stage) => (
            <SwiperSlide key={stage.id}>
              <h3>{stage.name}</h3>
              <div className="flex items-center justify-center p-2 rounded-[10px] w-[600px] h-[300px]">
                <p className="text-center">{stage.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return <div>Profiles</div>;
};

export default Profiles;
