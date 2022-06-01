<script lang="ts">
  import type { CafeData } from "@interfaces/cafeData";
  const starIcon = "./images/starIcon.png";

  export let cafeData: CafeData;
  export let index: number;
  export let isLast: boolean;
  export let isMobile: boolean;
</script>

<div class="container">
  {#if !isMobile}
    <div class="img">
      <img src={cafeData.img} alt="coffee" />
    </div>
  {/if}

  <div class="wrapper">
    <div class="indexWrapper">
      <div class="courseNumber">{index}</div>
      {#if !isLast}
        <div class="nextLine" />
      {/if}
    </div>

    <div class="contentsWrapper">
      {#if isMobile}
        <div class="img">
          <img src={cafeData.img} alt="coffee" />
        </div>
      {/if}
      <div class="title">
        <span>{cafeData.title}</span>
        <img class="starRate" src={starIcon} alt="star" />
        <span class="rate">{cafeData.rate}</span>
      </div>

      <div class="openTime">{cafeData.openTime}</div>
      <div class="location">{cafeData.location}</div>
      <div class="onTheWay">{cafeData.onTheWay}</div>

      {#if cafeData.refer}
        <div class="refer">{cafeData.refer}</div>
      {/if}
    </div>
  </div>
</div>

<style src="./CafeCard.scss"></style>
