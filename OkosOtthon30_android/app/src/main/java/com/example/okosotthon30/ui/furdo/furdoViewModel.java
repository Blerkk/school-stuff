package com.example.okosotthon30.ui.furdo;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class furdoViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public furdoViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("");
    }

    public LiveData<String> getText() {
        return mText;
    }
}