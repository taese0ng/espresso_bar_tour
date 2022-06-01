import type { CafeData } from "~/interfaces/cafeData";

export const CafeList: Array<CafeData> = [
  {
    title: "모츠커피",
    rate: "4.65",
    img: "./images/coffee1.png",
    openTime: "토요일 12:00 ~ 22:00",
    location: "서울 광진구 군자로3길 14 1층",
    onTheWay: "어린이대공원역 4번출구에서 10분",
  },
  {
    title: "카페 델 꼬또네",
    rate: "숨은 핫플",
    img: "./images/coffee2.png",
    openTime: "토요일 10:00 ~ 19:00",
    location: "서울 강남구 선릉로 711 1층 103호",
    onTheWay: "강남구청역 3번출구에서 3분",
  },
  {
    title: "구테로이테",
    rate: "4.73",
    img: "./images/coffee3.png",
    openTime: "매일 08:00 ~ 00:00",
    location: "서울 강남구 선릉로 131길 16 1층 구테로이테",
    onTheWay: "카페 델 꼬또네에서 3분 예상",
    refer: "*구테 넛 슈페너(봄 시즌 한정)",
  },
];
