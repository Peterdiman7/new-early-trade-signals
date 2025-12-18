<template>
	<div class="boxed_wrapper home_5 ltr">
		<section class="trading-style-three pt_20 pb_20">
			<div class="outer-container">
				<ul class="trading-list">
					<img src="https://tracking.telefuture.com/pixel?event=lead&order_id=12345" width="1" height="1" />
					<li v-for="item in tickerItems" :key="item.symbol">
						<div class="trading-block-three">
							<div style="display: flex; height: 40px; width: auto;">
								<img style="padding: 0 20px; max-width: 140px !important;" :src="item.img_url"
									:alt="item.symbol">
								<div style="position: relative; padding: 0 20px;">
									<h6>{{ item.symbol }}</h6>
									<span>
										{{ item.price }} / {{ item.recommendation }}
									</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<MobileSubscription v-if="isGermany && !subscriptionActive && loggedIn" />
		<section class="banner-style-five p_relative">
			<div class="large-container">
				<div class="banner-carousel owl-theme owl-carousel owl-nav-none owl-dots-none">
					<div class="slide-item p_relative">
						<div class="bg-layer"
							style="background-image: url('https://img.etimg.com/thumb/width-1200,height-900,imgsize-988744,resizemode-75,msid-111747133/markets/stocks/news/5-common-reasons-traders-lose-money-in-the-stock-market.jpg');">
						</div>
						<div class="inner-container">
							<div class="row align-items-center">
								<div class="col-lg-6 col-md-12 col-sm-12 content-column">
									<div class="content-box">
										<h2>{{ formatTranslation(t, 'home.a_z') }}</h2>
										<p>{{ formatTranslation(t, 'home.day_to_day') }}</p>
										<div class="btn-box">
											<a href="/login" class="theme-btn btn-one mr_15">{{ formatTranslation(t,
												'home.start_trading') }}</a>
											<a href="/login" class="theme-btn btn-two">{{ formatTranslation(t,
												'home.try_demo_trading') }}</a>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-12 col-sm-12 image-column">
									<div class="image-box ml_150">
										<figure class="image">
											<img style="max-width: 300px; border-radius: 9px; box-shadow: 10px 10px 10px -3px black;"
												src="https://cdn.mos.cms.futurecdn.net/sjgkU5wMJMmYa82mEJSESL.jpg"
												alt="">
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="slide-item p_relative">
						<div
							style="background-image: url('https://www.stockinvestor.com/wp-content/uploads/shutterstock_124509472.jpg');">
						</div>
						<div class="inner-container">
							<div class="row align-items-center">
								<div class="col-lg-6 col-md-12 col-sm-12 content-column">
									<div class="content-box">
										<h2>{{ formatTranslation(t, 'home.a_z') }}</h2>
										<p>{{ formatTranslation(t, 'home.day_to_day') }}</p>
										<div class="btn-box">
											<a href="/login" class="theme-btn btn-one mr_15">{{ formatTranslation(t,
												'home.start_trading') }}</a>
											<a href="/login" class="theme-btn btn-two">{{ formatTranslation(t,
												'home.try_demo_trading') }}</a>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-12 col-sm-12 image-column">
									<div class="image-box ml_150">
										<figure class="image">
											<img style="max-width: 300px; border-radius: 9px; box-shadow: 10px 10px 10px -3px black;"
												src="https://www.optiwise.io/storage/blog/2024/02/investor-relations.jpg"
												alt="">
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="slide-item p_relative">
						<div class="bg-layer"
							style="background-image: url('https://www.theforage.com/blog/wp-content/uploads/2022/09/what-is-an-investor.jpg');">
						</div>
						<div class="inner-container">
							<div class="row align-items-center">
								<div class="col-lg-6 col-md-12 col-sm-12 content-column">
									<div class="content-box">
										<h2>{{ formatTranslation(t, 'home.a_z') }}</h2>
										<p>{{ formatTranslation(t, 'home.day_to_day') }}</p>
										<div class="btn-box">
											<a href="/login" class="theme-btn btn-one mr_15">{{ formatTranslation(t,
												'home.start_trading') }}</a>
											<a href="/login" class="theme-btn btn-two">{{ formatTranslation(t,
												'home.try_demo_trading') }}</a>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-12 col-sm-12 image-column">
									<div class="image-box ml_150">
										<figure class="image">
											<img style="max-width: 300px; border-radius: 9px; box-shadow: 10px 10px 10px -3px black;"
												src="https://static.vecteezy.com/system/resources/thumbnails/049/930/379/small_2x/investment-profit-growth-4k-animation-of-businessman-investor-filled-with-strong-belief-holding-a-large-upward-trend-in-profit-growth-video.jpg"
												alt="">
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="process-style-two pt_80 pb_100">
			<div class="auto-container">
				<div class="row align-items-center">
					<div class="col-lg-6 col-md-12 col-sm-12 image-column">
						<div class="image_block_one">
							<div class="image-box pr_130 mr_40 pl_150">
								<figure class="image image-1">
									<img style="max-width: 400px; border-radius: 9px; "
										src="https://www.reuters.com/resizer/v2/3MW5DAEVVVL5DB77G4NKIKGOGY.jpg?auth=62115df14435e9d5c86829c8878a5051311300fd40ef35f4aa6ade9f5be06255&width=3500&quality=80"
										alt="bitcoin">
								</figure>
								<figure class="image image-2 p_absolute r_0 b_50"><img style="max-width: 200px;"
										src="https://cdn.prod.website-files.com/644906381498836718de2386/644906381498830a8ade3960_Kakvo%20e%20NFT%20i%20kak%20se%20izpolzva_.jpeg"
										alt="nft"></figure>
								<div class="content-one">
									<div class="shape" style="background-image: url(/images/shape/shape-30.png);">
									</div>
									<span>Sales</span>
									<h3>1.25 kk</h3>
									<p>Washington, D.C.</p>
								</div>
							</div>
						</div>
					</div>
					<section class="about-section pt_100 pb_100">
						<div class="auto-container">
							<div class="row align-items-center">
								<div class="col-lg-6 col-md-12 col-sm-12 content-column">
									<div class="content_block_one">
										<div class="content-box mr_80">
											<div class="sec-title pb_30">
												<span class="sub-title mb_14">{{ formatTranslation(t, 'home.account')
												}}</span>
												<h2>{{ formatTranslation(t, 'home.trading_accounts') }}</h2>
											</div>
											<ul class="accordion-box">
												<li class="accordion block active-block">
													<div class="acc-btn active">
														<div class="icon-box"><i class="icon-29"></i></div>
														<h3>{{ formatTranslation(t, 'home.who') }}</h3>
													</div>
													<div class="acc-content current">
														<div class="content">
															<p>{{ formatTranslation(t, 'home.early_trade_signals') }}
															</p>
														</div>
													</div>
												</li>
												<li class="accordion block">
													<div class="acc-btn">
														<div class="icon-box"><i class="icon-29"></i></div>
														<h3>{{ formatTranslation(t, 'home.what_we_do') }}</h3>
													</div>
													<div class="acc-content">
														<div class="content">
															<p>{{ formatTranslation(t, 'home.what_we_deliver') }}</p>
														</div>
													</div>
												</li>
												<li class="accordion block">
													<div class="acc-btn">
														<div class="icon-box"><i class="icon-29"></i></div>
														<h3>{{ formatTranslation(t, 'home.how_it_works') }}</h3>
													</div>
													<div class="acc-content">
														<div class="content">
															<p>{{ formatTranslation(t, 'home.market_data') }}</p>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-12 col-sm-12 video-column">
									<div class="video_block_one">
										<div class="video-box z_1 p_relative ml_70 centred">
											<div class="video-inner"
												style="background-image: url('https://media.digitalnomads.world/wp-content/uploads/2022/03/20112834/Stock-Day-Trading.jpg'); box-shadow: 5px 5px 5px -5px black;">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</section>
		<section class="trading-style-six pb_100">
			<div class="auto-container">
				<div class="sec-title centred pb_60">
					<span class="sub-title mb_14">{{ formatTranslation(t, 'home.trade_now') }}</span>
					<h2>{{ formatTranslation(t, 'home.spreads') }}</h2>
				</div>
				<div class="tabs-box">
					<div class="tabs-content">
						<div class="tab active-tab" id="tab-1">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-2">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">{{ formatTranslation(t, 'home.trade') }}</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-3">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-4">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-5">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-6">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="tab" id="tab-7">
							<div class="table-outer">
								<ul class="table-content">
									<li class="table-title">
										<p>instrument</p>
										<p><span class="mr_80">{{ formatTranslation(t, 'home.sellers') }}</span><span>{{
											formatTranslation(t, 'home.buyers') }}</span></p>
										<p></p>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-3.png" alt=""></div>
											<h6>Euro</h6>
											<span>Adyen: xams . EUR</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="32%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">32%</span>
												<span class="buyers">68%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-5.png" alt=""></div>
											<h6>Pound</h6>
											<span>Adyen: xams . GBP</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="55%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">55%</span>
												<span class="buyers">45%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-7.png" alt=""></div>
											<h6>CAD</h6>
											<span>Adyen: xams . CAD</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="50%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">50%</span>
												<span class="buyers">50%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-9.png" alt=""></div>
											<h6>Riyal</h6>
											<span>Adyen: xams . RYL</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="30%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">30%</span>
												<span class="buyers">70%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
									<li class="table-data">
										<div class="single-item">
											<div class="flag"><img src="/images/icons/flag-1.png" alt=""></div>
											<h6>Aud</h6>
											<span>Adyen: xams . Aud</span>
										</div>
										<div class="progress-box">
											<div class="bar">
												<div class="bar-inner count-bar" data-percent="60%"></div>
											</div>
											<div class="text-box">
												<span class="sellers">60%</span>
												<span class="buyers">40%</span>
											</div>
										</div>
										<div class="btn-box">
											<a href="/signals">Trade</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="account-style-two clear-bg centred pt_80 pb_70">
			<div class="auto-container">
				<div class="sec-title pb_50">
					<span class="sub-title mb_14">{{ formatTranslation(t, 'home.account') }}</span>
					<h2>{{ formatTranslation(t, 'home.trading_account') }}</h2>
				</div>
				<div class="row clearfix">
					<div class="col-lg-3 col-md-6 col-sm-12 account-block">
						<div class="account-block-two wow fadeInUp animated" data-wow-delay="00ms"
							data-wow-duration="1500ms">
							<div class="inner-box">
								<div class="icon-box"><i class="icon-16"></i></div>
								<h3><a href="/login">{{ formatTranslation(t, 'home.professional_account') }}</a></h3>
								<p>{{ formatTranslation(t, 'home.professional_account') }}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6 col-sm-12 account-block">
						<div class="account-block-two wow fadeInUp animated" data-wow-delay="200ms"
							data-wow-duration="1500ms">
							<div class="inner-box">
								<div class="icon-box"><i class="icon-17"></i></div>
								<h3><a href="/login">{{ formatTranslation(t, 'home.overview_account') }}</a></h3>
								<p>{{ formatTranslation(t, 'home.overview_account_info') }}</p>
								<div class="btn-box"><a href="/login" class="theme-btn btn-one">{{ formatTranslation(t,
									'home.create_account') }}</a></div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6 col-sm-12 account-block">
						<div class="account-block-two wow fadeInUp animated" data-wow-delay="400ms"
							data-wow-duration="1500ms">
							<div class="inner-box">
								<div class="icon-box"><i class="icon-18"></i></div>
								<h3><a href="/login">{{ formatTranslation(t, 'home.demo_account') }}</a></h3>
								<p>{{ formatTranslation(t, 'home.demo_account_info') }}</p>
								<div class="btn-box"><a href="/login" class="theme-btn btn-one">{{ formatTranslation(t,
									'home.create_account') }}</a></div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6 col-sm-12 account-block">
						<div class="account-block-two wow fadeInUp animated" data-wow-delay="600ms"
							data-wow-duration="1500ms">
							<div class="inner-box">
								<div class="icon-box"><i class="icon-19"></i></div>
								<h3><a href="/login">{{ formatTranslation(t, 'home.islamic_account') }}</a></h3>
								<p>{{ formatTranslation(t, 'home.islamic_account_info') }}</p>
								<div class="btn-box"><a href="/login" class="theme-btn btn-one">{{ formatTranslation(t,
									'home.create_account') }}</a></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="apps-style-two pt_80 pb_80">
			<div class="pattern-layer"
				style="background-image: url('https://media.digitalnomads.world/wp-content/uploads/2022/03/20112834/Stock-Day-Trading.jpg');">
			</div>
			<div class="auto-container">
				<div class="row align-items-center">
					<div class="col-lg-6 col-md-12 col-sm-12 image-column">
						<div class="image-box">
							<figure class="image"><img src="/images/resource/apps-1.png" alt=""></figure>
						</div>
					</div>
					<div class="col-lg-6 col-md-12 col-sm-12 content-column">
						<div class="content_block_four">
							<div class="content-box ml_80">
								<div class="sec-title light pb_40">
									<h2>{{ formatTranslation(t, 'home.cookies') }}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="award-section pt_100 pb_100">
			<div class="auto-container">
				<div class="sec-title centred pb_60">
					<span class="sub-title mb_14">{{ formatTranslation(t, 'home.awarded') }}</span>
					<h2>{{ formatTranslation(t, 'home.globally_awarded') }}</h2>
				</div>
				<div class="table-outer">
					<table class="award-table">
						<tbody>
							<tr>
								<td>01</td>
								<td>
									<h3><a href="/">{{ formatTranslation(t, 'home.best_trading_platform') }}</a></h3>
								</td>
								<td><span>x1</span></td>
								<td>
									<figure class="image-box"><a href="/"><img src="/images/icons/award-1.png"
												alt=""></a></figure>
								</td>
								<td>2023</td>
							</tr>
							<tr>
								<td>02</td>
								<td>
									<h3><a href="/">{{ formatTranslation(t, 'home.excellence') }}</a></h3>
								</td>
								<td><span>x3</span></td>
								<td>
									<figure class="image-box"><a href="/"><img src="/images/icons/award-2.png"
												alt=""></a></figure>
								</td>
								<td>2017</td>
							</tr>
							<tr>
								<td>03</td>
								<td>
									<h3><a href="/">{{ formatTranslation(t, 'home.best_trading_platform') }}</a></h3>
								</td>
								<td><span>x4</span></td>
								<td>
									<figure class="image-box"><a href="/"><img src="/images/icons/award-3.png"
												alt=""></a></figure>
								</td>
								<td>2022</td>
							</tr>
							<tr>
								<td>04</td>
								<td>
									<h3><a href="/">{{ formatTranslation(t, 'home.technology_trade') }}</a></h3>
								</td>
								<td><span>x3</span></td>
								<td>
									<figure class="image-box"><a href="/"><img src="/images/icons/award-4.png"
												alt=""></a></figure>
								</td>
								<td>2014</td>
							</tr>
							<tr>
								<td>05</td>
								<td>
									<h3><a href="/">{{ formatTranslation(t, 'home.best_trading_platform') }}</a></h3>
								</td>
								<td><span>x4</span></td>
								<td>
									<figure class="image-box"><a href="/"><img src="/images/icons/award-5.png"
												alt=""></a></figure>
								</td>
								<td>2018</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
		<section class="experience-style-two">
			<div class="auto-container">
				<div class="inner-container">
					<div class="shape" style="background-image: url(/images/shape/shape-33.png);"></div>
					<div class="upper-box p_relative mb_55">
						<div class="row align-items-center">
							<div class="col-lg-6 col-md-12 col-sm-12 title-column">
								<div class="sec-title">
									<span class="sub-title mb_14">{{ formatTranslation(t, 'home.experience') }}</span>
									<h2>{{ formatTranslation(t, 'home.right_place') }}</h2>
								</div>
							</div>
							<div class="col-lg-6 col-md-12 col-sm-12 text-column">
								<div class="text-box">
									<p>{{ formatTranslation(t, 'home.cookies') }}</p>
									<a v-if="!loggedIn" href="/login" class="theme-btn btn-one">{{ formatTranslation(t,
										'home.start_trading') }}</a>
								</div>
							</div>
						</div>
					</div>
					<div class="lower-box">
						<div class="row clearfix">
							<div class="col-lg-3 col-md-6 col-sm-12 single-column">
								<div class="single-item">
									<h2>1 milion+</h2>
									<p>{{ formatTranslation(t, 'home.clients') }}</p>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-12 single-column">
								<div class="single-item">
									<h2>5 milion+</h2>
									<p>{{ formatTranslation(t, 'home.users') }}</p>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-12 single-column">
								<div class="single-item">
									<h2>18+</h2>
									<p>{{ formatTranslation(t, 'home.years_on_market') }}</p>
								</div>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-12 single-column">
								<div class="single-item">
									<h2>FSC</h2>
									<p>{{ formatTranslation(t, 'home.regulated') }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="testimonial-style-two pt_100 pb_70">
			<div class="auto-container">
				<div class="sec-title centred pb_60">
					<span class="sub-title mb_14">{{ formatTranslation(t, 'home.regulated') }}</span>
					<h2>{{ formatTranslation(t, 'home.love_from_users') }}</h2>
				</div>
				<div class="row clearfix">
					<div class="col-lg-4 col-md-6 col-sm-12 testimonial-block">
						<div class="testimonial-block-one">
							<div class="inner-box">
								<ul class="rating">
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
								</ul>
								<p>{{ formatTranslation(t, 'home.real_time_alerts') }}</p>
								<div class="author-box">
									<figure class="author-thumb"><img
											src="https://media.istockphoto.com/id/1979951980/photo/my-cat-is-my-best-painting-friend.webp?s=1024x1024&w=is&k=20&c=RiwDpG48f5Wn54-XxwZk5wxDthGej6JCPDW5iUYAt3Q="
											alt="">
									</figure>
									<h4>Brooklyn Simmons</h4>
									<span class="designation">{{ formatTranslation(t, 'home.nursing_assistant')
									}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 testimonial-block">
						<div class="testimonial-block-one">
							<div class="inner-box">
								<ul class="rating">
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
								</ul>
								<p>{{ formatTranslation(t, 'home.educational_resources') }}</p>
								<div class="author-box">
									<figure class="author-thumb"><img
											src="https://media.istockphoto.com/id/1644238002/photo/business-confidence-and-portrait-black-man-with-smile-in-office-startup-ceo-or-owner-at-hr.jpg?s=612x612&w=0&k=20&c=qv73OrrnOSfjzQuJiLOywdO2Ly7jsEmG6JhDXY1Qjc4="
											alt="">
									</figure>
									<h4>Guy Hawkins</h4>
									<span class="designation">{{ formatTranslation(t, 'home.web_designer') }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 testimonial-block">
						<div class="testimonial-block-one">
							<div class="inner-box">
								<ul class="rating">
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
									<li><i class="icon-37"></i></li>
								</ul>
								<p>{{ formatTranslation(t, 'home.signed') }}</p>
								<div class="author-box">
									<figure class="author-thumb"><img
											src="https://media.istockphoto.com/id/1450340623/photo/portrait-of-successful-mature-boss-senior-businessman-in-glasses-asian-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=f0EqWiUuID5VB_NxBUEDn92W2HLENR15CFFPzr-I4XE="
											alt="">
									</figure>
									<h4>Esther Ho</h4>
									<span class="designation">{{ formatTranslation(t, 'home.president') }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="subscribe-section">
			<div class="bg-color"></div>
			<div class="auto-container">
				<div class="inner-container">
					<div class="shape" style="background-image: url(/images/shape/shape-5.png);"></div>
					<div class="row align-items-center">
						<div class="col-lg-6 col-md-12 col-sm-12 text-column">
							<div class="text-box">
								<h2>{{ formatTranslation(t, 'home.subscribe_latest_news') }}</h2>
							</div>
						</div>
						<div class="col-lg-6 col-md-12 col-sm-12 form-column">
							<div class="form-inner">
								<form method="post" action="/contact">
									<div class="form-group">
										<input type="email" name="email" placeholder="Email Address" required>
										<button type="submit" class="theme-btn btn-one">{{ formatTranslation(t,
											'home.subscribe_latest_news') }}<i class="icon-26"></i></button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'

import { storeToRefs } from 'pinia'

import MobileSubscription from '@/components/MobileSubscription.vue'
import { useAuthStore } from '@/stores/auth'
import { formatTranslation } from '@/utils/i18'

const { t } = useI18n()
const auth = useAuthStore()
const { loggedIn, subscriptionActive } = storeToRefs(auth)

const API_URL = 'https://back.early-trade-signals.com'
const tickerItems = ref([])

async function loadTicker() {
	try {
		const response = await fetch(`${API_URL}/signals`, {
			credentials: 'include'
		})

		if (!response.ok) throw new Error('Failed to fetch ticker')

		const data = await response.json()
		tickerItems.value = data.signals || []
	} catch (err) {
		console.error('Ticker fetch failed:', err)
	}
}

declare global {
	interface Window {
		jQuery: any;
		$: any;
	}
}

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
const isGermany = computed(() => subdomain === 'de')

let carouselInstances: any[] = []

onMounted(async () => {
	await nextTick()

	setTimeout(() => {
		initializeComponents()
	}, 150)

	loadTicker()
})

onBeforeUnmount(() => {
	// Cleanup
	carouselInstances.forEach(instance => {
		try {
			if (instance && typeof instance.trigger === 'function') {
				instance.trigger('destroy.owl.carousel')
			}
		} catch (e) {
			console.warn('Carousel cleanup error:', e)
		}
	})
	carouselInstances = []
})

function initializeComponents() {
	const $ = window.$ || window.jQuery

	if (!$) {
		console.error('jQuery not available')
		return
	}

	// Initialize all carousels
	initCarousel('.banner-carousel', {
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		nav: false,
		dots: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn'
	})

	// Initialize other plugins
	initAccordion($)
	initNiceSelect($)
}

function initCarousel(selector: string, options: any) {
	const $ = window.$
	const element = $(selector)

	if (element.length && typeof $.fn.owlCarousel === 'function') {
		element.each(function () {
			const instance = $(this).owlCarousel(options)
			carouselInstances.push(instance)
		})
	}
}

function initAccordion($: any) {
	if ($('.accordion-box').length) {
		$('.accordion-box').on('click', '.acc-btn', function () {
			const $btn = $(this)
			const $accordion = $btn.closest('.accordion-box')

			if (!$btn.hasClass('active')) {
				$accordion.find('.acc-btn').removeClass('active')
				$accordion.find('.accordion').removeClass('active-block')
				$accordion.find('.acc-content').slideUp(300)
			}

			$btn.toggleClass('active')
			$btn.closest('.accordion').toggleClass('active-block')
			$btn.next('.acc-content').slideToggle(300)
		})
	}
}

function initNiceSelect($: any) {
	if ($.fn.niceSelect && $('select:not(.ignore)').length) {
		$('select:not(.ignore)').niceSelect()
	}
}
</script>

<style scoped></style>
