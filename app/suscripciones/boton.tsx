import React, { Component } from 'react';

interface FancyButtonProps {
	color?: string;
	width?: number;
	height?: number;
	fontSize?: number;
	borderWidth?: number;
	buttonText?: string;
	maskId: string; // Añade maskId como prop
}

class FancyButton extends Component<FancyButtonProps> {
	static defaultProps: Partial<FancyButtonProps> = {
		color: '#FFFFFF',
		width: 410,
		height: 100,
		fontSize: 40,
		borderWidth: 15,
		buttonText: 'FANCY BUTTON',
	};

	render() {
		const { color, width, height, fontSize, borderWidth, buttonText,maskId } = this.props;

		
		const maskStyle = `#fancy-masked-element_${maskId} { mask: url(#${maskId}); -webkit-mask: url(#${maskId})}`;

		const buttonStyle: React.CSSProperties = {
			width: width ?? 0,
			height: height ?? 0,
		};

		const fancyFrontStyle: React.CSSProperties = {
			transform: `rotateX(0deg) translateZ(${(height ?? 0) / 2}px)`,
		};

		const fancyBackStyle: React.CSSProperties = {
			transform: `rotateX(90deg) translateZ(${(height ?? 0) / 2}px)`,
		};

		const textTransform = `matrix(1 0 0 1 ${(width ?? 0) / 2} ${(height ?? 0) / 1.6})`;
		const viewBox = `0 0 ${width ?? 0} ${height ?? 0}`;

		return (
			<div className="fancy-button" style={buttonStyle}>
				<div className="fancy-flipper">
					<div className="fancy-front" style={fancyFrontStyle}>
						<svg height={height} width={width} viewBox={viewBox}>
							<defs>
								<mask id={maskId}>
									<rect width="100%" height="100%" fill="#FFFFFF" />
									<text
										className="mask-text button-text"
										fill="#000000"
										transform={textTransform}
										fontFamily="'intro_regular'"
										fontSize={fontSize}
										width="100%"
										textAnchor="middle"
										letterSpacing="1"
									>
										{buttonText}
									</text>
								</mask>
							</defs>
							<style>{maskStyle}</style>
							<rect id={`fancy-masked-element_${maskId}`} fill={color} width="100%" height="100%" />
						</svg>
					</div>
					<div className="fancy-back" style={fancyBackStyle}>
						<svg height={height} width={width} viewBox={viewBox}>
							<rect
								stroke={color}
								strokeWidth={borderWidth}
								fill="transparent"
								width="100%"
								height="100%"
							/>
							<text
								className="button-text"
								transform={textTransform}
								fill={color}
								fontFamily="'intro_regular'"
								fontSize={fontSize}
								textAnchor="middle"
								letterSpacing="1"
							>
								{buttonText}
							</text>
						</svg>
					</div>
				</div>
			</div>
		);
	}
}

export default FancyButton;
