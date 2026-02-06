
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/report" | "/strike";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/report": Record<string, never>;
			"/strike": Record<string, never>
		};
		Pathname(): "/" | "/report" | "/report/" | "/strike" | "/strike/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/forensic_cover_autopsy_1770260508399.png" | "/forensic_founder_timeline_1770260523902.png" | "/forensic_hashrate_ghost_1770260539136.png" | "/gateway_hero.png" | "/images/floating_bat.png" | "/images/forensic_cover_autopsy_1770260508399.png" | "/images/forensic_founder_timeline_1770260523902.png" | "/images/forensic_hashrate_ghost_1770260539136.png" | "/images/strike_cover_v2.png" | "/images/vbs_cover_slide_1770259706682.png" | "/images/vbs_decay_slide_1770259721572.png" | "/images/vbs_dubai_event_1770259805037.png" | "/images/vbs_forensic_slide_1770259900285.png" | "/images/vbs_hydra_slide_1770259856165.png" | "/images/vbs_intel_slide_1770259841058.png" | "/images/vbs_otc_distress_1770259785111.png" | "/images/vbs_portfolio_slide_1770259757259.png" | "/images/vbs_risk_storm_1770259885028.png" | "/robots.txt" | string & {};
	}
}