import DiariesAPI, { AddDiaryType, UpdateDiaryType } from '@/api/diaries.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const diariesApi = new DiariesAPI();

// userId가 같은 diary 여러개 불러오기
export const useDiariesToUserId = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['diaries', userId],
    queryFn: () => diariesApi.selectPagesOfDiaryId(userId)
  });
  return { data, isLoading, error };
};

// diary 한개 불러오기
export const useDiary = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['diaries', id],
    queryFn: () => diariesApi.selectDiaryOfDiaryId(id)
  });
  return { data, isLoading, error };
};

// 새로운 diary 생성하기
export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDiary: AddDiaryType) => await diariesApi.insertDiary(newDiary),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['diaries']
      });
    }
  });
};

// diary 삭제하기
export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => diariesApi.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['diaries']
      });
    }
  });
};

// diary 수정하기
export const useUpdateDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updateDiary }: { id: string; updateDiary: UpdateDiaryType }) =>
      diariesApi.updatePage(id, updateDiary),
    onSuccess: (data, variables) => {
      // 'variables'를 통해 mutationFn에 전달된 'id'에 접근
      queryClient.invalidateQueries({
        queryKey: ['diaries']
      });
      queryClient.invalidateQueries({
        queryKey: ['pages', variables.id]
      });
    }
  });
};