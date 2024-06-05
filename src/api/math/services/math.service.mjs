import { CowService } from '../../cow/services/cow.service.mjs';
import { FeedService } from '../../feed/services/feed.service.mjs';
import { ReportService } from '../../report/services/report.service.mjs';

export class MathService {
	constructor() {
		this.feedService = new FeedService();
		this.cowService = new CowService();
		this.reportService = new ReportService();
	}

	async calculationOfFeedMixture(data) {
		const isValidParams = this._isValidParams(data);
		if (!isValidParams) return { status: 400, data: { message: 'Invalid Credetians' } };
		const { DMFEDDAY, numberCow, DMamt, feedArrayId, cowId } = data;
		let AnimalWeight = data.AnimalWeight * numberCow;
		const feeds = await this.feedService.getManyFeedByIds(feedArrayId);
		const cow = await this.cowService.getCowById(cowId);
		const GAIN = this._GAINCalculation({ DMFEDDAY, AnimalWeight, feeds, cow });
		const PROT = this._PROTCalculation({ AnimalWeight, cow, GAIN });
		const CALC = this._CALCCalculation({ AnimalWeight, cow, GAIN });
		const PHOS = this._PHOSCalculation({ AnimalWeight, cow, GAIN });
		const AFamt = this._AFamtCalculation({ DMamt, feeds });
		const offeredDMI = this._offeredDMICalculation({ DMFEDDAY, AnimalWeight });
		const NDFallowableDMI = this._NDFallowableDMICalculation(feeds);
		const OfferVsAllov = this._offerVsAllovCalculation(offeredDMI, NDFallowableDMI);
		const C_A_R = this._C_A_R_Calculation(DMamt, feeds, DMFEDDAY);
		const NEmMegacalCWT_DM = this._NEmMegacalCWTCalculationDM(AnimalWeight, DMFEDDAY);
		const NEmMegacalCWT_DRY = this._sumElemFeedCalculation(feeds, 'NEm');
		const MultipleOfNem = this._MultipleOfNemCalculation(NEmMegacalCWT_DM, NEmMegacalCWT_DRY);
		const MEMegcalCWT = this._sumElemFeedCalculation(feeds, 'ME');
		const NEgMegacalCWT = this._sumElemFeedCalculation(feeds, 'NEg');
		const TDN_array = this._TDN_arrayCalculation(feeds, C_A_R[0]);
		const TDN_Report = this._TDN_ReportCalculation(TDN_array);
		const calculatedMoistureOfASISmixture = this._calculatedMoistureOfASISmixture(C_A_R[0], C_A_R[1]);
		const cost = this._sumElemFeedCalculation(feeds, 'CostCWT');
		const NDF1 = this._Elems_Calculation(feeds, C_A_R[0], 'NDF');
		const NDF = this._Elems_Sum(NDF1);
		const eNDF1 = this._Elems_Calculation(feeds, C_A_R[0], 'eNDF');
		const eNDF = this._Elems_Sum(eNDF1);
		const crudeProtein1 = this._Elems_Calculation(feeds, C_A_R[0], 'CP');
		const crudeProtein = this._Elems_Sum(crudeProtein1);
		const DIP1 = this._Elems_Calculation(feeds, C_A_R[0], 'DIP');
		const DIP = this._Elems_Sum(DIP1);
		const Potassium1 = this._Elems_Calculation(feeds, C_A_R[0], 'K');
		const Potassium = this._Elems_Sum(Potassium1);
		const Calcium1 = this._Elems_Calculation(feeds, C_A_R[0], 'CA');
		const Calcium = this._Elems_Sum(Calcium1);
		const Phosphorus1 = this._Elems_Calculation(feeds, C_A_R[0], 'P');
		const Phosphorus = this._Elems_Sum(Phosphorus1);
		const MG = this._Elems_Calculation(feeds, C_A_R[0], 'MG');
		const Magnesium = this._Elems_Sum(MG);
		const S = this._Elems_Calculation(feeds, C_A_R[0], 'S');
		const Sulfur = this._Elems_Sum(S);
		const CO = this._Elems_Calculation(feeds, C_A_R[0], 'CO');
		const Cobalt = this._Elems_Sum(CO);
		const CU = this._Elems_Calculation(feeds, C_A_R[0], 'CU');
		const Copper = this._Elems_Sum(CU);
		const FE = this._Elems_Calculation(feeds, C_A_R[0], 'FE');
		const Iron = this._Elems_Sum(FE);
		const MN = this._Elems_Calculation(feeds, C_A_R[0], 'MN');
		const Manganese = this._Elems_Sum(MN);
		const SE = this._Elems_Calculation(feeds, C_A_R[0], 'SE');
		const Selenium = this._Elems_Sum(SE);
		const reportData = {
			cowId: cow._id,
			DMamt,
			GAIN,
			feedIds: feedArrayId,
			userLogin: data.login,
			NEmMegacalCWT_DRY,
			MultipleOfNem,
			MEMegcalCWT,
			NEgMegacalCWT,
			TDN: TDN_Report,
			calculatedMoistureOfASISmixture,
			cost,
			PROT,
			CALC,
			PHOS,
			AFamt,
			OfferVsAllov,
			NDF: {
				value: NDF,
				status: NDF < 30 ? 'Дефіцит' : 'Достатньо',
			},
			eNDS: {
				value: eNDF,
				status: eNDF < 30 ? 'Дефіцит' : 'Достатньо',
			},
			crudeProtein: {
				value: crudeProtein,
				status: crudeProtein < 14 ? 'Дефіцит' : crudeProtein < 19 ? 'Достатньо' : 'Надлишок',
			},
			DIP: {
				value: DIP,
				status: DIP < 7 ? 'Дефіцит' : DIP < 10 ? 'Достатньо' : 'Надлишок',
			},
			Potassium: {
				value: Potassium,
				status: Potassium < 0.4 ? 'Дефіцит' : Potassium < 0.7 ? 'Достатньо' : 'Надлишок',
			},
			Calcium: {
				value: Calcium,
				status: Calcium < 0.34 ? 'Дефіцит' : Calcium < 0.9 ? 'Достатньо' : 'Надлишок',
			},
			Phosphorus: {
				value: Phosphorus,
				status:
					Phosphorus < 0.24
						? 'Дефіцит'
						: Phosphorus < 0.6
							? 'Достатньо'
							: Phosphorus < 0.9
								? 'Надлишок'
								: 'Токсична',
			},
			Magnesium: {
				value: Magnesium,
				status:
					Magnesium < 0.17
						? 'Дефіцит'
						: Magnesium < 0.3
							? 'Достатньо'
							: Magnesium < 0.7
								? 'Надлишок'
								: 'Токсична',
			},
			Sulfur: {
				value: Sulfur,
				status: Sulfur < 0.07 ? 'Дефіцит' : Sulfur < 0.1 ? 'Достатньо' : Sulfur < 0.3 ? 'Надлишок' : 'Токсична',
			},
			Cobalt: {
				value: Cobalt,
				status: Cobalt < 0.06 ? 'Дефіцит' : Cobalt < 0.1 ? 'Достатньо' : Cobalt < 4.9 ? 'Надлишок' : 'Токсична',
			},
			Copper: {
				value: Copper,
				status: Copper < 3 ? 'Дефіцит' : Copper < 10 ? 'Достатньо' : Copper < 114 ? 'Надлишок' : 'Токсична',
			},
			Iron: {
				value: Iron,
				status: Iron < 49 ? 'Дефіцит' : Iron < 100 ? 'Достатньо' : Iron < 999 ? 'Надлишок' : 'Токсична',
			},
			Manganese: {
				value: Manganese,
				status:
					Manganese < 19
						? 'Дефіцит'
						: Manganese < 49
							? 'Достатньо'
							: Manganese < 999
								? 'Надлишок'
								: 'Токсична',
			},
			Selenium: {
				value: Selenium,
				status:
					Selenium < 0.19
						? 'Дефіцит'
						: Selenium < 0.39
							? 'Достатньо'
							: Selenium < 0.499
								? 'Надлишок'
								: 'Токсична',
			},
		};

		const newReport = await this.reportService.createReport(reportData);

		return {
			status: 200,
			data: {
				report: newReport,
			},
		};
	}

	_Elems_Sum(elems) {
		return elems.reduce((sum, elem) => parseFloat((sum + elem).toFixed(2)), 0);
	}

	_Elems_Calculation(feeds, C, elem) {
		return feeds.map((feed, i) => parseFloat(((feed[elem] * C[i]) / 100).toFixed(2)));
	}

	_sumElemFeedCalculation(feeds, el) {
		return feeds.reduce((sum, feed) => parseFloat((sum + feed[el]).toFixed(2)), 0);
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
