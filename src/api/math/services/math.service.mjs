import { CowService } from '../../cow/services/cow.service.mjs';
import { FeedService } from '../../feed/services/feed.service.mjs';

export class MathService {
	constructor() {
		this.feedService = new FeedService();
		this.cowService = new CowService();
	}

	async calculationOfFeedMixture(data) {
		const isValidParams = this._isValidParams(data);
		if (!isValidParams) return { status: 400, data: { message: 'Invalid Credetians' } };
		const { DMFEDDAY, AnimalWeight, DMamt, feedArrayId, cowId } = data;
		const feeds = await this.feedService.getManyFeedByIds(feedArrayId);
		const cow = await this.cowService.getCowById(cowId);
		console.log('feeds :>> ', feeds);
		console.log('cow :>> ', cow);
		const GAIN = this._GAINCalculation({ DMFEDDAY, AnimalWeight, feeds, cow });
		console.log('GAIN :>> ', GAIN);
		const PROT = this._PROTCalculation({ AnimalWeight, cow, GAIN });
		const CALC = this._CALCCalculation({ AnimalWeight, cow, GAIN });
		const PHOS = this._PHOSCalculation({ AnimalWeight, cow, GAIN });
		const AFamt = this._AFamtCalculation({ DMamt, feeds });
		const offeredDMI = this._offeredDMICalculation({ DMFEDDAY, AnimalWeight });
		const NDFallowableDMI = this._NDFallowableDMICalculation(feeds);
		const OfferVsAllov = this._offerVsAllovCalculation(offeredDMI, NDFallowableDMI);
		const C_A_R = this._C_A_R_Calculation(DMamt, feeds, DMFEDDAY);
		const NEmMegacalCWT_DM = this._NEmMegacalCWTCalculationDM(AnimalWeight, DMFEDDAY);
		const NEmMegacalCWT_DRY = this._NEmMegacalCWTCalculationDRY(feeds);
		const MultipleOfNem = this._MultipleOfNemCalculation(NEmMegacalCWT_DM, NEmMegacalCWT_DRY);
		const MEMegcalCWT = this._MEMegcalCWTCalculation(feeds);
		const NEgMegacalCWT = this._NEgMegacalCWTCalculation(feeds);
		const TDN_array = this._TDN_arrayCalculation(feeds, C_A_R[0]);
		const TDN_Report = this._TDN_ReportCalculation(TDN_array);
		const calculatedMoistureOfASISmixture = this._calculatedMoistureOfASISmixture(C_A_R[0], C_A_R[1]);
		const cost = this._costCalculation(feeds);
		const NDF = this._NDF_Calculation(feeds);
		const eNDF = this._eNDF_Calculation(feeds);
		const crudeProtein = this._crudeProtein(feeds);
		// console.log('offeredDMI :>> ', offeredDMI);
		// console.log('NDFallowableDMI :>> ', NDFallowableDMI);
		// console.log('OfferVsAllov :>> ', OfferVsAllov);
		return {
			status: 200,
			data: {
				report: {
					NEmMegacalCWT_DRY,
					MultipleOfNem,
					MEMegcalCWT,
					NEgMegacalCWT,
					TDN: TDN_Report,
					calculatedMoistureOfASISmixture,
					cost,
					NDF: {
						value: NDF,
						status: NDF < 24 ? 'Дефіцит' : NDF < 34 ? 'Достатньо' : 'Надлишок',
					},
					eNDS: {
						value: eNDF,
						status: eNDF < 24 ? 'Дефіцит' : eNDF < 34 ? 'Достатньо' : 'Надлишок',
					},
					crudeProtein: {
						value: crudeProtein,
						status: crudeProtein < 14 ? 'Дефіцит' : crudeProtein < 19 ? 'Достатньо' : 'Надлишок',
					},
				},
			},
		};
	}

	_crudeProtein(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.CP).toFixed(2)), 0);
	}

	_eNDF_Calculation(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.eNDF).toFixed(2)), 0);
	}

	_NDF_Calculation(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.NDF).toFixed(2)), 0);
	}

	_costCalculation(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.CostCWT).toFixed(2)), 0);
	}

	_calculatedMoistureOfASISmixture(C, R) {
		const sumC = C.reduce((sum, C) => parseFloat((sum + C).toFixed(2)), 0);
		const sumR = R.reduce((sum, R) => parseFloat((sum + R).toFixed(2)), 0);
		return parseFloat((100 - (sumC / sumR) * 100).toFixed(2));
	}

	_TDN_ReportCalculation(TDN_array) {
		return TDN_array.reduce((sum, TDN) => parseFloat((sum + TDN).toFixed(2)), 0);
	}

	_TDN_arrayCalculation(feeds, comp) {
		return feeds.map((feed, i) => parseFloat(((comp[i] * feed.TDN) / 100).toFixed(2)));
	}

	_NEgMegacalCWTCalculation(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.NEg).toFixed(2)), 0);
	}

	_MEMegcalCWTCalculation(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.ME).toFixed(2)), 0);
	}

	_MultipleOfNemCalculation(NEmMegacalCWT_DM, NEmMegacalCWT_DRY) {
		return parseFloat((NEmMegacalCWT_DRY / NEmMegacalCWT_DM).toFixed(2));
	}

	_NEmMegacalCWTCalculationDRY(feeds) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed.NEm).toFixed(2)), 0);
	}

	_NEmMegacalCWTCalculationDM(AnimalWeight, DMFEDDAY) {
		const numerator = parseFloat(((AnimalWeight / 2.2) ** 0.75).toFixed(2));
		const denominator = parseFloat((DMFEDDAY / 100).toFixed(2));
		const NEmMegacalCWT = parseFloat((0.077 * (numerator / denominator)).toFixed(2));
		return NEmMegacalCWT;
	}

	_C_A_R_Calculation(DMamt, feeds, DMFEDDAY) {
		const sumDMamt = parseFloat(DMamt.reduce((sum, el) => sum + el, 0).toFixed(2));
		const C = DMamt.map((el) => parseFloat(((el / sumDMamt) * 100).toFixed(2)));
		const sumC = parseFloat(C.reduce((sum, el) => sum + el, 0).toFixed(2));
		const R = C.map((el, i) => parseFloat(((el * 100) / feeds[i].DM).toFixed(2)));
		const sumR = parseFloat(R.reduce((sum, el) => sum + el, 0).toFixed(2));
		const A = parseFloat(((DMFEDDAY * sumR) / sumC).toFixed(2));
		return [C, R, A];
	}

	_offerVsAllovCalculation(offeredDMI, NDFallowableDMI) {
		return parseFloat((offeredDMI / NDFallowableDMI).toFixed(2));
	}

	_NDFallowableDMICalculation(feeds) {
		const sumAllNEm = parseFloat(feeds.reduce((sum, feed) => sum + feed.NEm, 0).toFixed(2));
		return parseFloat((120 / sumAllNEm).toFixed(2));
	}

	_offeredDMICalculation({ DMFEDDAY, AnimalWeight }) {
		return parseFloat(((DMFEDDAY / AnimalWeight) * 100).toFixed(2));
	}

	_AFamtCalculation({ DMamt, feeds }) {
		const AFamt = feeds.map((feed, i) => parseFloat(((DMamt[i] / feed.DM) * 100).toFixed(2)));
		return AFamt;
	}

	_PHOSCalculation({ AnimalWeight, cow, GAIN }) {
		const m075 = parseFloat((AnimalWeight ** 0.75).toFixed(2));
		const PHOS = parseFloat((cow.a3 + 0.1 * m075 + cow.b3 * GAIN - 0.02 * GAIN * m075).toFixed(2));
		return PHOS;
	}

	_CALCCalculation({ AnimalWeight, cow, GAIN }) {
		const m075 = parseFloat((AnimalWeight ** 0.75).toFixed(2));
		const CALC = parseFloat((cow.a2 + 0.1 * m075 + 17 * GAIN - cow.c2 * GAIN * m075).toFixed(2));
		return CALC;
	}

	_GAINCalculation({ DMFEDDAY, AnimalWeight, feeds, cow }) {
		const E1 = parseFloat(feeds.reduce((sum, feed) => sum + feed.NEm, 0).toFixed(2));
		const E2 = parseFloat(feeds.reduce((sum, feed) => sum + feed.NEg, 0).toFixed(2));
		const m075 = parseFloat((AnimalWeight ** 0.75).toFixed(2));
		const GAIN = parseFloat(
			(cow.a * (((DMFEDDAY - (m075 * 0.043) / (E1 * 0.01)) * E2) / 100) ** cow.b * AnimalWeight ** cow.c).toFixed(
				2
			)
		);
		return GAIN;
	}

	_PROTCalculation({ AnimalWeight, cow, GAIN }) {
		const m075 = parseFloat((AnimalWeight ** 0.75).toFixed(2));
		const PROT = parseFloat((cow.a1 + 0.007 * m075 + 0.45 * GAIN - 0.0011 * GAIN * m075).toFixed(2));
		return PROT;
	}

	_isValidParams(data) {
		const { DMFEDDAY, AnimalWeight, feedArrayId, cowId, DMamt } = data;
		if (
			!DMFEDDAY ||
			!DMamt ||
			!DMamt.length ||
			!DMamt.every((element) => typeof element === 'number') ||
			!AnimalWeight ||
			!feedArrayId ||
			!feedArrayId.length ||
			!feedArrayId.every((element) => typeof element === 'string') ||
			!cowId ||
			typeof AnimalWeight !== 'number' ||
			typeof DMFEDDAY !== 'number' ||
			typeof cowId !== 'string'
		)
			return false;
		return true;
	}
}
