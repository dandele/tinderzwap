const googlePlay = new Proxy({"src":"/_astro/google-play.ISTMcpLO.png","width":300,"height":89,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/dandele/Desktop/ 1 - Roles/ZwapAlternative/zwapalternative/astroship/astrowind/src/assets/images/google-play.png";
							}
							
							return target[name];
						}
					});

export { googlePlay as default };
