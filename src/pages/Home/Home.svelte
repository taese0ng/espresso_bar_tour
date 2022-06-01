<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Header from "@components/Header";
  import CafeCard from "@components/CafeCard";
  import Footer from "@components/Footer";
  import { CafeList } from "@constants/cafeData";

  let isMobile = false;
  const tabletWidth = 850;

  const classifedMobile = (width: number) => {
    if (width < tabletWidth) isMobile = true;
    else isMobile = false;
  };

  const handleResizeWindow = (e) => {
    const target = e.currentTarget;
    const width = target.innerWidth;

    classifedMobile(width);
  };

  onMount(() => {
    classifedMobile(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResizeWindow);
  });
</script>

<main>
  <div class="container">
    <Header />

    {#each CafeList as cafe, idx}
      <div>
        <CafeCard
          {isMobile}
          cafeData={cafe}
          index={idx + 1}
          isLast={idx + 1 === CafeList.length}
        />
      </div>
    {/each}

    <Footer />
  </div>
</main>

<style src="./Home.scss"></style>
