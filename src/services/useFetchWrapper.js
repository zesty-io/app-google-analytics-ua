

export const useFetchWrapper = (zuid, token) => {

    const ZestyAPI = new window.Zesty.FetchWrapper(zuid, token, {
        authAPIURL: `${process.env.REACT_APP_AUTH_API}`,
        instancesAPIURL: `${process.env.REACT_APP_INSTANCE_API}`,
        accountsAPIURL: `${process.env.REACT_APP_ACCOUNTS_API}`,
        mediaAPIURL: `${process.env.REACT_APP_MEDIA_API}`,
        sitesServiceURL: `${process.env.REACT_APP_SITES_SERVICE}`,
    });

    const getGoogleSetting = async () => {

        const settings = await ZestyAPI.getSettings();
        // if (Object.keys(settings.data).length === 0)
  
        const gaProfile = settings.data.find(
          (setting) => setting.key === "google_profile_id"
        );
    
        const urchinId = settings.data.find(
          (setting) => setting.key === "google_urchin_id"
        );

        return {
            gaProfile,
            urchinId
        }

    }

    const getUserData = async () => {

        return await ZestyAPI.verify()

    }

    const updateSetting = async (settingZuid, data) => {

        return await ZestyAPI.updateSetting(settingZuid, data)
        
    }

    return {
        getGoogleSetting,
        getUserData,
        updateSetting
    }

}