// TODO: Import here all the data
import OECDRawPart0 from '../../data/OECD/2015/OECDRawIO.part0.json'
import OECDRawPart1 from '../../data/OECD/2015/OECDRawIO.part1.json'
import OECDRawPart2 from '../../data/OECD/2015/OECDRawIO.part2.json'
import OECDEmployment from '../../data/OECD/2015/OECDEmployment.part0.json'
import MSREndUse from '../../data/MSR/COBALT/Co_End_Use.part0.json'
import MSREndUseDistribution from '../../data/MSR/COBALT/Co_End_Use_Distribution.part0.json'
import MSRFirstUse from '../../data/MSR/COBALT/Co_First_Use.part0.json'
import MSRFirstUseDistribution from '../../data/MSR/COBALT/Co_First_Use_Distribution.part0.json'
import MSRRawData from '../../data/MSR/COBALT/Co_MSR_Raw_Data.part0.json'

const OECDRawInputOutput = [].concat(OECDRawPart0 as []).concat(OECDRawPart1 as []).concat(OECDRawPart2 as []);

export {
  OECDRawInputOutput,
  OECDEmployment,
  MSREndUse,
  MSREndUseDistribution,
  MSRFirstUse,
  MSRFirstUseDistribution,
  MSRRawData
};
