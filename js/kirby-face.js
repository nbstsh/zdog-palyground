import Zdog from 'zdog';

// colors
const COLOR_PINK = '#F8B';
const COLOR_BLUSH = '#F5A';
const COLOR_BLACK = '#333';
const COLOR_RED = '#D03';

const generateIllo = () =>
	new Zdog.Illustration({
		element: '.kirby-face-canvas',
		zoom: 3
	});

const addBodyToIllo = illo =>
	new Zdog.Shape({
		stroke: 22,
		addTo: illo,
		color: COLOR_PINK
	});

const addFaceToBody = body =>
	new Zdog.Anchor({
		translate: { z: 10.5 },
		addTo: body
	});

const addEyeToFace = (face, eyePositionX = 1) => {
	const eyeGroup = new Zdog.Group({
		addTo: face,
		translate: { x: 2.4 * eyePositionX, y: -2 },
		rotate: { x: -0.1 }
	});
	// eye
	new Zdog.Ellipse({
		width: 1.4,
		height: 5.5,
		addTo: eyeGroup,
		stroke: 1,
		color: COLOR_BLACK,
		fill: true
	});
	// eye highlight
	new Zdog.Ellipse({
		width: 1,
		height: 2,
		addTo: eyeGroup,
		translate: { y: -1.5, z: 0.5 },
		stroke: 0.5,
		color: '#FFF',
		fill: true
	});
};

const addCheeckToFace = (face, cheeckRotateY) => {
	const cheeck = new Zdog.Anchor({
		addTo: face,
		rotate: { y: 0.6 * cheeckRotateY }
	});

	new Zdog.Ellipse({
		width: 2.5,
		height: 1,
		translate: { y: 1, z: 10.5 },
		addTo: cheeck,
		color: COLOR_BLUSH,
		stroke: 1
	});
};

const addMouthToFace = face => {
	// mouth
	new Zdog.Shape({
		path: [
			{ x: 0, y: 0 },
			{
				bezier: [
					{ x: 1.1, y: 0 },
					{ x: 1.1, y: 0.2 },
					{ x: 1.1, y: 0.5 }
				]
			},
			{
				bezier: [
					{ x: 1.1, y: 1.1 },
					{ x: 0.2, y: 1.8 },
					{ x: 0, y: 1.8 }
				]
			},
			{
				bezier: [
					{ x: -0.2, y: 1.8 },
					{ x: -1.1, y: 1.1 },
					{ x: -1.1, y: 0.5 }
				]
			},
			{ bezier: [{ x: -1.1, y: 0.2 }, { x: -1.1, y: 0 }, { x: 0, y: 0 }] }
		],
		addTo: face,
		translate: { y: 2, z: -0.5 },
		stroke: 1,
		color: COLOR_RED,
		fill: true
	});
};

const initIllo = () => {
	const illo = generateIllo();
	const body = addBodyToIllo(illo);
	const face = addFaceToBody(body);
	addEyeToFace(face, 1);
	addEyeToFace(face, -1);
	addCheeckToFace(face, 1);
	addCheeckToFace(face, -1);
	addMouthToFace(face);

	return illo;
};

const illo = initIllo();
illo.updateRenderGraph();
