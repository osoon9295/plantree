export const addParchment = async (parchmentData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diaryparchment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parchmentData),
    cache: 'no-store'
  });
  const data = await response.json();
  return data;
};

export const getParchment = async (diaryId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diaryparchment/${diaryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  const data = await response.json();
  return data;
};

export const deleteParchment = async (diaryId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diaryparchment/${diaryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  const data = await response.json();
  return data;
};

export const updateParchment = async (diaryId: string, parchmentData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diaryparchment/${diaryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parchmentData),
    cache: 'no-store'
  });
  const data = await response.json();
  return data;
};
