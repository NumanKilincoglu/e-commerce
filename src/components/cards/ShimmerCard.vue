<template>
    <div class="shimmer-container">
        <div class="shimmer-img"></div>
        <div class="shimmer-name"></div>
        <div class="shimmer-name"></div>
        <div class="shimmer-price"></div>
    </div>
</template>
  
<style scoped>
.shimmer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f9f9f9;
    border-radius: 0.4rem;
    margin-block: 0.4rem;
    padding: 0.6rem 0.6rem;
    position: relative;
    transition: 0.3s;
    overflow: hidden;
    
}

.shimmer-img {
    border-radius: 3px;
    height: 90px;
    width: 90px;
    background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;
}

.shimmer-name {
    height: 20px;
    width: 90%;
    border-radius: 4px;
    background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;
}

.shimmer-price {
    height: 20px;
    width: 80px;
    border-radius: 4px;
    background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;
}

@media only screen and (max-width:745px) {
    .shimmer-img {
        height: 90px;
        width: 90px;
    }

    .shimmer-container {
        position: relative;
        transition: 0.3s;
        min-height: 250px;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }


}


@keyframes shimmer {
    to {
        background-position: 200% 0;
    }
}
</style>
  