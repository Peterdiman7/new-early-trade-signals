<template>
    <div class="loader-wrap">
        <div class="preloader">
            <div id="handle-preloader" class="handle-preloader">
                <div class="animation-preloader">
                    <div class="spinner"></div>
                    <div class="txt-loading">
                        <span data-text-preloader="e" class="letters-loading">
                            e
                        </span>
                        <span data-text-preloader="a" class="letters-loading">
                            a
                        </span>
                        <span data-text-preloader="r" class="letters-loading">
                            r
                        </span>
                        <span data-text-preloader="l" class="letters-loading">
                            l
                        </span>
                        <span data-text-preloader="y" class="letters-loading">
                            y
                        </span>
                        <span data-text-preloader="-" class="letters-loading">
                            -
                        </span>
                        <span data-text-preloader="t" class="letters-loading">
                            t
                        </span>
                        <span data-text-preloader="r" class="letters-loading">
                            r
                        </span>
                        <span data-text-preloader="a" class="letters-loading">
                            a
                        </span>
                        <span data-text-preloader="d" class="letters-loading">
                            d
                        </span>
                        <span data-text-preloader="e" class="letters-loading">
                            e
                        </span>
                        <span data-text-preloader="-" class="letters-loading">
                            -
                        </span>
                        <span data-text-preloader="s" class="letters-loading">
                            s
                        </span>
                        <span data-text-preloader="i" class="letters-loading">
                            i
                        </span>
                        <span data-text-preloader="g" class="letters-loading">
                            g
                        </span>
                        <span data-text-preloader="n" class="letters-loading">
                            n
                        </span>
                        <span data-text-preloader="a" class="letters-loading">
                            a
                        </span>
                        <span data-text-preloader="l" class="letters-loading">
                            l
                        </span>
                        <span data-text-preloader="s" class="letters-loading">
                            s
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
$(window).on('load', function () {
    setTimeout(() => {
        $(".preloader").fadeOut(100)
    }, 1000)
})
</script>