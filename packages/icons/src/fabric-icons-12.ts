  // Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import {
  IIconOptions,
  IIconSubset,
  registerIcons
} from '@uifabric/styling';

export function initializeIcons(
  baseUrl: string = '',
  options?: IIconOptions
): void {
  const subset: IIconSubset = {
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons-12"`,
      src: `url('${baseUrl}fabric-icons-12-e6882c74.woff') format('woff')`
    },
    icons: {
      'FieldRequired': '\uF443',
      'BacklogBoard': '\uF444',
      'ExternalBuild': '\uF445',
      'ExternalTFVC': '\uF446',
      'ExternalXAML': '\uF447',
      'IssueSolid': '\uF448',
      'DefectSolid': '\uF449',
      'LadybugSolid': '\uF44A',
      'NugetLogo': '\uF44C',
      'TFVCLogo': '\uF44D',
      'ProjectLogo32': '\uF47E',
      'ProjectLogoFill32': '\uF47F',
      'ProjectLogo16': '\uF480',
      'ProjectLogoFill16': '\uF481',
      'SwayLogo32': '\uF482',
      'SwayLogoFill32': '\uF483',
      'SwayLogo16': '\uF484',
      'SwayLogoFill16': '\uF485',
      'ClassNotebookLogo32': '\uF486',
      'ClassNotebookLogoFill32': '\uF487',
      'ClassNotebookLogo16': '\uF488',
      'ClassNotebookLogoFill16': '\uF489',
      'ClassNotebookLogoInverse32': '\uF48A',
      'ClassNotebookLogoInverse16': '\uF48B',
      'StaffNotebookLogo32': '\uF48C',
      'StaffNotebookLogoFill32': '\uF48D',
      'StaffNotebookLogo16': '\uF48E',
      'StaffNotebookLogoFill16': '\uF48F',
      'StaffNotebookLogoInverted32': '\uF490',
      'StaffNotebookLogoInverted16': '\uF491',
      'KaizalaLogo': '\uF492',
      'TaskLogo': '\uF493',
      'ProtectionCenterLogo32': '\uF494',
      'GallatinLogo': '\uF496',
      'Globe2': '\uF49A',
      'Guitar': '\uF49B',
      'Breakfast': '\uF49C',
      'Brunch': '\uF49D',
      'BeerMug': '\uF49E',
      'Vacation': '\uF49F',
      'Teeth': '\uF4A0',
      'Taxi': '\uF4A1',
      'Chopsticks': '\uF4A2',
      'SyncOccurence': '\uF4A3',
      'UnsyncOccurence': '\uF4A4',
      'PrimaryCalendar': '\uF4AE',
      'SearchCalendar': '\uF4AF',
      'VideoOff': '\uF4B0',
      'MicrosoftFlowLogo': '\uF4B1',
      'BusinessCenterLogo': '\uF4B2',
      'ToDoLogoBottom': '\uF4B3',
      'ToDoLogoTop': '\uF4B4',
      'EditSolid12': '\uF4B5',
      'EditSolidMirrored12': '\uF4B6',
      'UneditableSolid12': '\uF4B7',
      'UneditableSolidMirrored12': '\uF4B8',
      'UneditableMirrored': '\uF4B9',
      'AdminALogo32': '\uF4BA',
      'AdminALogoFill32': '\uF4BB',
      'ToDoLogoInverse': '\uF4BC',
      'Snooze': '\uF4BD',
      'WaffleOffice365': '\uF4E0',
      'ImageSearch': '\uF4E8',
      'NewsSearch': '\uF4E9',
      'VideoSearch': '\uF4EA',
      'R': '\uF4EB',
      'FontColorA': '\uF4EC',
      'FontColorSwatch': '\uF4ED',
      'LightWeight': '\uF4EE',
      'NormalWeight': '\uF4EF',
      'SemiboldWeight': '\uF4F0',
      'GroupObject': '\uF4F1',
      'UngroupObject': '\uF4F2',
      'AlignHorizontalLeft': '\uF4F3',
      'AlignHorizontalCenter': '\uF4F4',
      'AlignHorizontalRight': '\uF4F5',
      'AlignVerticalTop': '\uF4F6',
      'AlignVerticalCenter': '\uF4F7',
      'AlignVerticalBottom': '\uF4F8',
      'HorizontalDistributeCenter': '\uF4F9',
      'VerticalDistributeCenter': '\uF4FA',
      'Ellipse': '\uF4FB',
      'Line': '\uF4FC',
      'Octagon': '\uF4FD',
      'Hexagon': '\uF4FE',
      'Pentagon': '\uF4FF',
      'RightTriangle': '\uF500',
      'HalfCircle': '\uF501',
      'QuarterCircle': '\uF502',
      'ThreeQuarterCircle': '\uF503',
      '6PointStar': '\uF504',
      '12PointStar': '\uF505',
      'ArrangeBringToFront': '\uF506',
      'ArrangeSendToBack': '\uF507',
      'ArrangeSendBackward': '\uF508',
      'ArrangeBringForward': '\uF509',
      'BorderDash': '\uF50A',
      'BorderDot': '\uF50B',
      'LineStyle': '\uF50C',
      'LineThickness': '\uF50D'
    }
  };

  registerIcons(subset, options);
}
