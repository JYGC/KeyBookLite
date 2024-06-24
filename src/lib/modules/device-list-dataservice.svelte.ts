export class DeviceListDataService {
  devices = $state<string[]>([]);
  private mustReload = $state<boolean>(true);

  constructor() {
    $effect(() => {
      if (this.mustReload) {
        this.devices.push(`${this.mustReload}`);
        this.mustReload = false;
      }
    });
  }

  add = () => {
    this.mustReload = true;
  }
};