import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Profile: { name: string };
  Register: undefined;
  Workspace: { name: string };
  MainStack: { screen?: string };
  Settings: undefined;
  CreateBoard: undefined;
  Board: { id: number };
  CardDetail: {name:string}
};

export type BaseResponse<T> = {
  message: string;
  status: number;
  code: string;
  data: T;
}

export type BaseListResponse<T> = {
  message: string;
  status: number;
  code: string;
  data: Array<T>;
}

// Navigation Prop type
export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Route Prop type (optional but useful)
export type RootRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;
