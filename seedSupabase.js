// seedSupabase.js
const { createClient } = require('@supabase/supabase-js');

// 1단계: Supabase 프로젝트 정보 입력
// 아래 'YOUR_PROJECT_URL'과 'YOUR_ANON_KEY'를 위 가이드에서 복사한 값으로 교체하세요.
const supabaseUrl = 'https://wrhrhdyaadvdyjztldzv.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyaHJoZHlhYWR2ZHlqenRsZHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzAyOTksImV4cCI6MjA2OTYwNjI5OX0.8ZFpYa2yP1cssRv0BKLg3CZxl2Exc_mWRJURUhE7M9A';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 불상 데이터 생성 함수
async function seedBuddhas() {
    const numberOfBuddhas = 100; // 생성할 불상 개수 (원하는 대로 조절)
    const recordsToInsert = [];

    console.log(`Supabase에 ${numberOfBuddhas}개의 불상 데이터를 생성 중...`);

    for (let i = 1; i <= numberOfBuddhas; i++) {
       // 이미지 번호를 3자리 숫자로 포맷 (예: 1 -> 001)
        const imageNumber = String(i).padStart(4, '0');
        const buddhaData = {
            // Supabase는 기본적으로 'id' 컬럼에 순차적으로 값을 자동 할당하므로,
            // 별도로 id 값을 지정하지 않아도 됩니다. 여기서는 편의를 위해 포함합니다.
            id: i,
            imageBw: `https://i.postimg.cc/63nNhhHt/buddha-001-bw.png`, 
            imageColor: `https://i.postimg.cc/fLpJV5Vs/buddha-001-color.png`,
            isColored: false,
            donatorName: null,
            donationDate: null,
            donatorDeviceId: null 
        };
        recordsToInsert.push(buddhaData);
    }

    try {
        // 일괄 삽입 (bulk insert)을 사용하여 여러 레코드를 한 번에 추가합니다.
        const { data, error } = await supabase
            .from('buddhas') // 'buddhas' 테이블에 삽입
            .insert(recordsToInsert);

        if (error) {
            console.error('불상 데이터 추가 중 오류 발생:', error);
            return;
        }

        console.log(`${numberOfBuddhas}개의 불상 데이터가 Supabase에 성공적으로 추가되었습니다.`);
        // console.log('삽입된 데이터:', data); // 삽입된 데이터 확인
    } catch (error) {
        console.error('시딩 프로세스 중 치명적인 오류 발생:', error);
    }
}

// 스크립트 실행 함수 호출
seedBuddhas().then(() => {
    console.log('데이터 시딩 프로세스 완료.');
}).catch(error => {
    console.error('시딩 프로세스 중 치명적인 오류 발생:', error);
});
