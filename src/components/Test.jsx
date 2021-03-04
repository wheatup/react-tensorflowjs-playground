import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const Test = () => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const plot = async (pointsArray, feat) => {
			tfvis.render.scatterplot(
				{
					name: `${feat} vs House Price`
				},
				{
					values: [pointsArray],
					series: ['original']
				},
				{
					xLabel: feat,
					yLabel: 'Price'
				}
			);
		};

		(async () => {
			// const dataSet = tf.data.csv('/data/kc_house_data.csv');
			const dataSet = tf.data.csv('/data/kc_house_data.csv').take(100);
			// const dataArray = await dataSet.take(10).toArray();

			const points = dataSet.map(({ sqft_living: x, price: y }) => ({ x, y }));
			plot(await points.toArray(), 'Square Feet');

			const featureValues = await points.map(p => p.x).toArray();
			const featureTensor = tf.tensor2d(featureValues, [featureValues.length, 1]);

			const labelValues = await points.map(p => p.y).toArray();
			const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

			featureTensor.print();
			labelTensor.print();

			setReady(true);
		})();
	}, []);

	return (
		<section className="Test">
			<span>{ready ? 'Done' : 'Calculating...'}</span>
		</section>
	);
};

export default Test;
